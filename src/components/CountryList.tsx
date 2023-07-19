import { useCitiesContext } from "../context/CitiesContext";
import styles from "../styles/CountryList.module.css";
import { City, Country } from "../types";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";

export default function CountryList() {
  const { cities, isLoading } = useCitiesContext();

  if (isLoading) return <Spinner />;

  if (!cities?.length)
    return <Message message="Add you first city by clicking on the map" />;

  const countriesList: Country[] = cities?.reduce(
    (arr: Country[], city: City) => {
      const accumulatedCountries: boolean = arr
        .map((el: Country) => el.country)
        .includes(city.country);

      if (!accumulatedCountries) {
        return [...arr, { country: city.country, emoji: city.emoji }];
      } else {
        return arr;
      }
    },
    []
  );

  return (
    <ul className={styles.countryList}>
      {countriesList?.map((country: Country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}
