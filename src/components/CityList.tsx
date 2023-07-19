import { useCitiesContext } from "../context/CitiesContext";
import styles from "../styles/CityList.module.css";
import { City } from "../types";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";

export default function CityList() {
  const { cities, isLoading } = useCitiesContext();

  if (isLoading) return <Spinner />;

  if (!cities?.length)
    return <Message message="Add you first city by clicking on the map" />;

  return (
    <ul className={styles.cityList}>
      {cities?.map((city: City) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
