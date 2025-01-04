
export type GetContinentsType = {
  continents: {
    code: string;
    name: string;
  }[];
}

export type GetContinentWithCountriesType = {
  continent: {
    code: string;
    name: string;
    countries: {
      name: string;
    }[];
  };
}
export type GetContinentsWithCountriesType = {
  continents: {
    code: string;
    name: string;
    countries: {
      name: string;
    }[];
  }[];
}
export type GetCountriesAndLanguagesType = {
  countries: {
    name: string;
    languages: {
      name: string;
    }[];
  }[];
};
export type GetLanguagesByContinentType = {
  continent: {
    name: string;
    countries: {
      languages: {
        name: string;
      }[];
    }[];
  };
};
