import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import createApolloClient from '../../../apollo-client';
import { GET_ALL_COUNTRIES } from '@/lib/queries';
import { SingleCountryType } from '@/types/queries';


export const revalidate = 2592000;//revaidate each month

function UnicodeFlagFromEmojiU({ emojiU }: { emojiU: string }) {
  const codePoints = emojiU.split(' ').map(u => parseInt(u.slice(2), 16));
  return (
    <span className="text-4xl mr-2" role="img" aria-label="country flag">
      {String.fromCodePoint(...codePoints)}
    </span>
  );
}

export default async function CountriesPage() {
  const client = createApolloClient();

  const { data } = await client.query({ query: GET_ALL_COUNTRIES });

  const countries: SingleCountryType[] = data?.countries || [];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-xl font-bold mb-8">Countries of the World</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {countries?.map((country: SingleCountryType) => (
          <Link key={country?.code} href={`/countries/${country?.code}`}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UnicodeFlagFromEmojiU emojiU={country?.emojiU} />
                  {country?.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Code: {country?.code}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
