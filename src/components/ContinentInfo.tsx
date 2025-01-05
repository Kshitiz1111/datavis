import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GetContinentsWithCountriesType, GetContinentWithCountriesType } from "@/types/queries"

const ContinentInfo = ({ data }: { data: GetContinentsWithCountriesType | GetContinentWithCountriesType | undefined }) => {

  const transformedData = (data?.continents) ?
    {
      totalContinentCount: data?.continents?.length,
      nameOfContinents: data?.continents.map((continent) => continent?.name),
      continents: data?.continents
    }
    :
    {
      totalContriesCount: data?.continent?.countries?.length,
      nameOfContinent: data?.continent?.name,
      nameOfCountries: data?.continent?.countries?.map((country) => country.name)
    }

  // console.log("transformedData", transformedData)

  return (
    <Card className="w-full h-full overflow-auto">
      <CardHeader>
        <CardTitle>There are {transformedData?.continents ? transformedData.totalContinentCount : transformedData?.totalContriesCount} {transformedData?.continents ? "Continents" : "Countries"} in {transformedData?.continents ? "Total" : transformedData?.nameOfContinent}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-2">Code: { }</p>
        <h3 className="font-semibold mb-2">{transformedData?.continents ? "List Of Continents: " : "List Of Countries: "}</h3>
        <div className="h-[200px] overflow-y-hidden">
          <ul className="pl-5 h-full flex flex-wrap overflow-y-scroll">
            {transformedData?.continents ?
              transformedData?.nameOfContinents?.map((item, index) => (
                <li key={index} className="mx-1 my-1 h-fit rounded-md bg-gray-200 px-2">{item}</li>
              ))
              :
              transformedData?.nameOfCountries?.map((item, index) => (
                <li key={index} className="mx-1 my-1 h-fit rounded-md bg-gray-200 px-2">{item}</li>
              ))
            }
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
export default ContinentInfo