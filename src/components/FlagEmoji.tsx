interface CountryProps {
  countryCode: string;
}

const FlagEmoji = ({ countryCode }: CountryProps) => {
  // Convert country code to Unicode regional indicator symbols
  const flag = countryCode
    .toUpperCase() // Ensure uppercase country code
    .split('') // Split the code into individual letters
    .map((char) => String.fromCodePoint(0x1f1e6 + char.charCodeAt(0) - 65)) // Map letters to regional indicator symbols
    .join('');

  return <span>{flag}</span>;
};

export default FlagEmoji;
