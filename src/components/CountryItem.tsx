import styles from "../styles/CountryItem.module.css";
import { CountryProps } from "../types";

function CountryItem({ country }: CountryProps) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
