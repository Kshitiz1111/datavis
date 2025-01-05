import { gql } from "@apollo/client";

export const GET_CONTINENTS = gql`
  query GetContinents{
    continents{
      code
      name
    }
  }
`
export const GET_CONTINENT_WITH_COUNTRIES = gql`
  query GetContinentWithCountires($code:ID!){
    continent(code: $code){
      code
      name
      countries{
        name
      }
    }
  }
`
export const GET_CONTINENTS_WITH_COUNTRIES = gql`
  query GetContinentsWithCountires{
    continents{
      code
      name
      countries{
        name
      }
    }
  }
`
export const GET_COUNTRIES_AND_LANGUAGES = gql`
  query GetCountriesAndLanguages{
    countries{
      name
      languages{
        name
      }
    }
  }
`
export const GET_LANGUAGES_BY_CONTINENT = gql`
  query GetLanugagesByContinent($code: ID!){
    continent(code: $code){
      name
      countries{
        languages{
          name
        }
      }
    }
  }
`
export const GET_ALL_COUNTRIES = gql`
  query GetAllCountries {
    countries {
      code
      name
      emoji
      emojiU
    }
  }
`;

export const GET_COUNTRY_DETAILS = gql`
  query GetCountryDetails($code: ID!) {
    country(code: $code) {
      continent {
        name
      }
      currency
      emojiU
      emoji
      name
      native
      phone
      states {
        name
      }
    }
  }
`;