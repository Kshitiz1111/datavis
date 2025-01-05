
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

export type Language = {
  name: string;
}
export type Country = {
  languages: Language[];
}
export type SingleCountryType = {
  code: string
  name: string
  emoji: string
  emojiU: string
}
export type LanguageCountType = Record<string, number>;
export type CountryDetailsType = {
  continent: {
    name: string;
  };
  currency: string;
  emojiU: string;
  emoji: string;
  name: string;
  native: string;
  phone: string;
  states: State[];
}