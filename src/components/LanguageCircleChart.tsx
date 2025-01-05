'use client'

import { useLazyQuery, useQuery } from "@apollo/client"
import { ResponsiveCirclePacking } from "@nivo/circle-packing"
import { GET_COUNTRIES_AND_LANGUAGES, GET_LANGUAGES_BY_CONTINENT } from "@/lib/queries"
import { GetCountriesAndLanguagesType, GetLanguagesByContinentType } from "@/types/queries"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { RootState } from "@/lib/store"
import { countCommonLanguages } from "@/lib/utils"
import { setLanugageCount } from "@/lib/features/continentSlice"


const LanguageCircleChart = ({ continentCode }: { continentCode: string }) => {

  const { continentLanguageCount } = useAppSelector((state: RootState) => state.continent)
  const dispatch = useAppDispatch();

  const { loading, error, data } = useQuery<GetCountriesAndLanguagesType>(GET_COUNTRIES_AND_LANGUAGES, { skip: continentCode !== "all" })

  const [fetchContinentLangs, { loading: loadingContinentLangs, data: continentLangs }] = useLazyQuery<GetLanguagesByContinentType>(GET_LANGUAGES_BY_CONTINENT)


  useEffect(() => {
    if (continentCode !== "all") {
      fetchContinentLangs({ variables: { code: continentCode } })
    }
  }, [continentCode])

  useEffect(() => {
    if (continentCode !== "all") {
      const value = countCommonLanguages(continentLangs?.continent?.countries || []);
      dispatch(setLanugageCount(value));
    }
    if (continentCode === "all") {
      const value = countCommonLanguages(data?.countries || []);
      dispatch(setLanugageCount(value));
    }
  }, [loadingContinentLangs, loading, continentLangs, data, dispatch]);


  if (loading) return <div className="w-full sm:h-[500px] h-[300px] flex items-center justify-center">Loading...</div>;
  if (error) return <div className="w-full h-[500px] flex items-center justify-center text-red-500">Error: {error?.message}</div>;

  const chartData = {
    name: "Languages",
    children: Object.entries(continentLanguageCount || {}).map(([key, value]) => ({
      name: key,
      value,
    })),
  };

  return (
    <div className="w-full sm:h-[500px] h-[400px] sm:my-4">
      <h1 className="w-full text-center text-xl">Spoken Languages</h1>

      <ResponsiveCirclePacking
        data={chartData}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        id="name"
        value="value"
        colors={{ scheme: "nivo" }}
        padding={4}
        enableLabels={true}
        labelsSkipRadius={10}
        labelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.5]] }}
        defs={[
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10
          }
        ]}
        fill={[{ match: { depth: 1 }, id: 'lines' }]}
        tooltip={({ id, value, color }) => (
          <div
            style={{
              padding: 12,
              color,
              background: '#222222',
            }}
          >
            <strong>{id}</strong>
            <br />
            {value} count
          </div>
        )}
      />
    </div>
  )
}

export default LanguageCircleChart

