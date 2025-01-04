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
