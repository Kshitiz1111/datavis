'use client'
// src/app/countries/[code].tsx
import { useQuery } from '@apollo/client';
import { GET_COUNTRY_DETAILS } from '@/lib/queries';
import { useParams } from 'next/navigation';
import { CountryDetailsType } from '@/types/queries';


export default function CountryPage() {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_COUNTRY_DETAILS, {
    variables: { code: id },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const country: CountryDetailsType = data?.country;
  console.log(data)
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">
        {country?.emoji} {country?.name}
      </h1>
      <p>Continent: {country?.continent.name}</p>
      <p>Currency: {country?.currency}</p>
      <p>Native Name: {country?.native}</p>
      <p>Phone Code: {country?.phone}</p>
      {country?.states?.length > 0 &&
        <>
          <h2 className="text-2xl mt-4">States:</h2>
          <ul>
            {country?.states?.map((state, index) => (
              <li key={index}>{state?.name}</li>
            ))}
          </ul>
        </>
      }
    </div>
  );
}
