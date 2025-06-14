'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { GET_CONTINENTS, GET_CONTINENTS_WITH_COUNTRIES, GET_CONTINENT_WITH_COUNTRIES } from "@/lib/queries";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GetContinentsType, GetContinentsWithCountriesType, GetContinentWithCountriesType } from "@/types/queries";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { setAllContinentsData, setSelectedContinentCode, setSelectedContinentData } from "@/lib/features/continentSlice";
import CountryContinentBarGraph from "@/components/CountryContinentBarGraph";
import ContinentInfo from "@/components/ContinentInfo";
import LanguageCircleChart from "@/components/LanguageCircleChart";


const ContinentCon = () => {
  const dispatch = useAppDispatch();
  const { selectedContinentCode, allContinentsData, selectedContinentData } = useAppSelector((state: RootState) => state.continent);

  const { loading: loadingContinentsCountriesList, error: errorContinentsCountries, data: ContinentsCountriesList } = useQuery<GetContinentsWithCountriesType | undefined>(GET_CONTINENTS_WITH_COUNTRIES, { skip: selectedContinentCode !== 'all' });

  const { loading: loadingContinentList, error, data: continentList } = useQuery<GetContinentsType | undefined>(GET_CONTINENTS);

  const [fetchContinent, { loading: loadingContinent, data: continentData }] = useLazyQuery<GetContinentWithCountriesType>(GET_CONTINENT_WITH_COUNTRIES)

  const handleSelectChange = (value: string) => {
    if (value !== "all") {
      fetchContinent({ variables: { code: value } })
    }
    dispatch(setSelectedContinentCode(value))
  }

  console.log(loadingContinentsCountriesList,
    errorContinentsCountries,
    error,
    loadingContinent,)


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

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-green-100">
          {
            (selectedContinentCode !== 'all') ?
              `${selectedContinentData?.continent?.name || ""} Continent`
              :
              "All Continents"
          }
        </h1>
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

      <div className="flex flex-col sm:flex-row sm:h-[400px] w-full gap-2">
        <CountryContinentBarGraph data={allContinentsData || selectedContinentData || undefined} />
        <div className="w-full sm:w-1/2 h-fit sm:h-full" style={{ marginTop: "1rem" }}>
          <ContinentInfo data={allContinentsData || selectedContinentData || undefined} />
        </div>
      </div>

      <div className="py-4" style={{ marginTop: "2rem" }}>
        <LanguageCircleChart continentCode={selectedContinentCode} />
      </div>
    </div>
  )
}
export default ContinentCon