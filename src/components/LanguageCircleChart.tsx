'use client'

import { useQuery } from "@apollo/client"
import { ResponsiveCirclePacking } from "@nivo/circle-packing"
import { GET_COUNTRIES_AND_LANGUAGES } from "@/lib/queries"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Language {
  name: string;
}

interface Country {
  languages: Language[];
}

interface CountriesAndLanguagesData {
  countries: Country[];
}

const LanguageCircleChart = () => {
  const { loading, error, data } = useQuery<CountriesAndLanguagesData>(GET_COUNTRIES_AND_LANGUAGES)

  const countCommonLanguages = (countries: Country[]) => {
    const languageCounts: Record<string, number> = {};
    countries.forEach(country => {
      country.languages.forEach(language => {
        languageCounts[language.name] = (languageCounts[language.name] || 0) + 1;
      });
    });
    return languageCounts;
  }

  if (loading) return <div className="w-full h-[500px] flex items-center justify-center">Loading...</div>;
  if (error) return <div className="w-full h-[500px] flex items-center justify-center text-red-500">Error: {error.message}</div>;

  const chartData = {
    name: "Languages",
    children: Object.entries(countCommonLanguages(data?.countries || [])).map(([key, value]) => ({
      name: key,
      value,
    })),
  };

  return (
    <Card className="w-full h-[500px]">
      <CardHeader>
        <CardTitle>Language Distribution</CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-4rem)]">
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
              {value} countries
            </div>
          )}
        />
      </CardContent>
    </Card>
  )
}

export default LanguageCircleChart

