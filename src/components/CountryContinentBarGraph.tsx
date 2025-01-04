'use client'
import { GetContinentsWithCountriesType, GetContinentWithCountriesType } from "@/types/queries"
import { ResponsiveBar } from "@nivo/bar";

const CountryContinentBarGraph = ({ data }: { data: GetContinentsWithCountriesType | GetContinentWithCountriesType | undefined }) => {
  // console.log("data from bargraph", data, data?.continents?.map((item) => item.code));
  // console.log(data?.continents.map((item) => item?.countries?.length))
  // let transformedData = [];
  // if (data?.continents.length > 0) {
  const transformedData = (data?.continents) ?
    data?.continents?.map((continent) => ({
      id: continent?.code,
      name: continent?.name,
      value: continent?.countries?.length,
    }))
    :
    [{
      id: data?.continent?.code,
      continentName: data?.continent?.name,
      name: data?.continent?.countries?.map((country) => country?.name),
      value: data?.continent?.countries?.length,
    }]
  // console.log("transformedData", transformedData)
  // }

  const colorMap: Record<string, string> = {
    AF: '#e57373',
    AN: '#64b5f6',
    AS: '#81c784',
    EU: '#ffb74d',
    NA: '#ba68c8',
    OC: '#4db6ac',
    SA: '#f06292',
  };
  return (
    <div className="sm:w-1/2 w-full h-[400px]">
      {data &&
        <ResponsiveBar
          data={transformedData}
          keys={['value']}
          indexBy="id" // Use 'id' (continent code) for the bottom axis
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
            legend: 'Continent', // Label for the x-axis
            legendPosition: 'middle',
            legendOffset: 40,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Number of Countries', // Label for the y-axis
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
          colors={({ id }) => colorMap[id as keyof typeof colorMap] || '#90a4ae'}
          tooltip={({ id, value, data }) => (
            <div className="bg-white p-2 rounded-md shadow-md">
              <strong>{data.name.length > 1 ? data.continentName : data.name}</strong>: {value} countries
            </div>
          )}
        />
      }

    </div>
  )
}
export default CountryContinentBarGraph