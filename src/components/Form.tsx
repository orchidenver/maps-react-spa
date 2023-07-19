import { useState, useEffect, FormEvent } from "react";
import DatePicker from "react-datepicker";
import Button from "./Button";
import BackButton from "./BackButton";
import { useNavigate } from "react-router-dom";
import { useURLPosition } from "../hooks";
import { CityLocation, City } from "../types";
import Message from "./Message";
import Spinner from "./Spinner";

import styles from "../styles/Form.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { useCitiesContext } from "../context/CitiesContext";

function Form() {
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState<boolean>(false);
  const [geocodingError, setGeocodingError] = useState<string>("");
  const [cityName, setCityName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);
  const [notes, setNotes] = useState<string>("");
  const navigate = useNavigate();
  const [lat, lng] = useURLPosition();
  const { createNewCity, isLoading } = useCitiesContext();

  useEffect(() => {
    if (!lat && !lng) return;

    async function fetchCityData(): Promise<void> {
      try {
        setIsLoadingGeocoding(true);
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );
        const data = (await res.json()) as unknown as CityLocation;

        if (!data.countryCode)
          throw new Error(
            "That doesn't seem to be a city. Click somewhere else 😉"
          );

        setCityName(data?.city || data?.locality || "");
        setCountry(data?.countryName);
      } catch (error) {
        setGeocodingError(
          "That doesn't seem to be a city. Click somewhere else 😉"
        );
      } finally {
        setIsLoadingGeocoding(false);
      }
    }

    void fetchCityData();
  }, [lat, lng]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity: City = {
      cityName,
      country,
      date,
      notes,
      position: { lat, lng },
    };

    createNewCity(newCity);
    navigate("/app/cities");
  }

  if (isLoadingGeocoding) return <Spinner />;

  if (!lat && !lng)
    return <Message message="Start by clicking somewhere on the map" />;

  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          onChange={(date: Date | null) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
