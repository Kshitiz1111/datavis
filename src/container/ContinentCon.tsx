'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { GET_CONTINENTS, GET_CONTINENTS_WITH_COUNTRIES, GET_CONTINENT_WITH_COUNTRIES, GET_COUNTRIES_AND_LANGUAGES } from "@/lib/queries";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GetContinentsType, GetContinentsWithCountriesType, GetContinentWithCountriesType, GetCountriesAndLanguagesType } from "@/types/queries";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { setAllContinentsData, setAllContinentsLanugageCount, setSelectedContinentCode, setSelectedContinentData } from "@/lib/features/continentSlice";
import CountryContinentBarGraph from "@/components/CountryContinentBarGraph";
import ContinentInfo from "@/components/ContinentInfo";
import LanguageCircleChart from "@/components/LanguageCircleChart";


const ContinentCon = () => {
  const dispatch = useAppDispatch();
  const { selectedContinentCode, allContinentsData, selectedContinentData, loading, allContinentsLanguageCount } = useAppSelector((state: RootState) => state.continent);

  const { loading: loadingContinentsCountriesList, error: errorContinentsCountries, data: ContinentsCountriesList } = useQuery<GetContinentsWithCountriesType | undefined>(GET_CONTINENTS_WITH_COUNTRIES, { skip: selectedContinentCode !== 'all' });

  console.log("ContinentsCountriesList", ContinentsCountriesList)

  const { loading: loadingContinentList, error, data: continentList } = useQuery<GetContinentsType | undefined>(GET_CONTINENTS);

  const [fetchContinent, { loading: loadingContinent, data: continentData }] = useLazyQuery<GetContinentWithCountriesType>(GET_CONTINENT_WITH_COUNTRIES)

  console.log("continentData", continentData)



  const handleSelectChange = (value: string) => {
    if (value !== "all") {
      fetchContinent({ variables: { code: value } })
    }
    // localStorage.setItem("selectedContinentCode", value)
    dispatch(setSelectedContinentCode(value))
  }

  useEffect(() => {
    if (selectedContinentCode !== 'all' && continentData) {
      dispatch(setSelectedContinentData(continentData))
      dispatch(setAllContinentsData(undefined))
    }
    if (selectedContinentCode === 'all' && ContinentsCountriesList) {
      dispatch(setAllContinentsData(ContinentsCountriesList))
      dispatch(setSelectedContinentData(undefined))
    }
  }, [ContinentsCountriesList, continentData])



  console.log("selectedContinentCode, allContinentsData, selectedContinentData, loading", selectedContinentCode, allContinentsData, selectedContinentData, loading)


  return (
    <div>
      <div className="flex justify-between items-center">
        <span className="text-6xl font-semibold text-green-100">
          {
            (selectedContinentCode !== 'all') ?
              `${selectedContinentData?.continent?.name || ""} Continent`
              :
              "All Continents"
          }
        </span>
        <div>
          <Select onValueChange={(e) => {
            handleSelectChange(e)
          }} defaultValue={selectedContinentCode || ""}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              {loadingContinentList ? 'loading..'
                : (!loadingContinentList && continentList?.continents && continentList?.continents?.length > 0) ?
                  <>
                    <SelectItem value={'all'}>All</SelectItem>

                    {continentList?.continents?.map((continent: { code: string, name: string }) => (
                      <SelectItem key={continent.code} value={continent.code}>{continent.name}</SelectItem>
                    ))}
                  </>
                  : 'no data'
              }
            </SelectContent>
          </Select>

        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:h-[400px] w-full gap-4">
        <CountryContinentBarGraph data={allContinentsData || selectedContinentData || undefined} />

        <div className="w-full sm:w-1/2 h-auto sm:h-full m-0 sm:m-4">
          <ContinentInfo data={allContinentsData || selectedContinentData || undefined} />
        </div>
      </div>

      <div>
        <LanguageCircleChart data={allContinentsLanguageCount | undefined} />
      </div>
    </div>
  )
}
export default ContinentCon