'use client'
import { GetContinentsWithCountriesType, GetContinentWithCountriesType } from "@/types/queries"
import { ResponsiveBar } from "@nivo/bar";


interface ContinentSummary {
  id: string;    // Continent's code as id
  name: string;  // Continent's name
  value: number; // Number of countries in the continent
  [key: string]: string | number; // Add this line
}

const CountryContinentBarGraph = ({ data }: { data: GetContinentsWithCountriesType | GetContinentWithCountriesType | undefined }) => {

  const transformedData: ContinentSummary[] = (data && 'continents' in data)
    ? data.continents?.map((continent) => ({
      id: continent?.code ?? '',
      name: continent?.name ?? '',
      value: continent?.countries?.length ?? 0,
    })) ?? []
    : data?.continent
      ? [{
        id: data.continent.code ?? '',
        name: data.continent.name ?? '',
        value: data.continent.countries?.length ?? 0,
      }]
      : [];

  return (
    <div className="sm:w-1/2 w-full h-[400px]">
      {data &&
        <ResponsiveBar
          data={transformedData}
          keys={['value']}
          indexBy="id"
          margin={{ top: 40, right: 80, bottom: 80, left: 60 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Continent',
            legendPosition: 'middle',
            legendOffset: 40,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Number of Countries',
            legendPosition: 'middle',
            legendOffset: -50,
          }}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          colors={'#90a4ae'}
          tooltip={({ value, data }) => (
            <div className="bg-white p-2 rounded-md shadow-md">
              <strong>{data?.name?.length > 1 ? data?.continentName : data?.name}</strong>: {value} countries
            </div>
          )}
        />
      }

    </div>
  )
}
export default CountryContinentBarGraph