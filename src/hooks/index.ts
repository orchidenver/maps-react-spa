import { useState } from "react";
import { GeoPosition } from "../types";
import { useSearchParams } from "react-router-dom";

export function useGeolocation({ defaultPosition = null }: GeoPosition) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [position, setPosition] = useState(defaultPosition);
  const [error, setError] = useState<string | (() => string)>("");

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { isLoading, position, error, getPosition };
}

export function useURLPosition() {
  const [searchParams] = useSearchParams();
  const lat = Number(searchParams.get("lat"));
  const lng = Number(searchParams.get("lng"));

  return [lat, lng];
}
