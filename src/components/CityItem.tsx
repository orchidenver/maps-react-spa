import { MouseEvent } from "react";
import { CityProp } from "../types";
import { formatDate } from "../utils";
import styles from "../styles/CityItem.module.css";
import { Link } from "react-router-dom";
import { useCitiesContext } from "../context/CitiesContext";

export default function CityItem({
  city: {
    emoji,
    cityName,
    date,
    id,
    position: { lat, lng },
  },
}: CityProp) {
  const { currentCity, removeCity } = useCitiesContext();

  function removeCityFunction(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    removeCity(id);
  }
  console.log(date);
  return (
    <li>
      <Link
        to={`${id || "none"}?lat=${lat}&lng=${lng}`}
        className={`${styles.cityItem} ${
          id === currentCity?.id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={removeCityFunction}>
          &times;
        </button>
      </Link>
    </li>
  );
}
