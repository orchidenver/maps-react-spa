/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  Reducer,
  useCallback,
} from "react";
import {
  ProviderInterface,
  City,
  CitiesContextInterface,
  InitialStateInterface,
  Actions,
  ActionTypes,
} from "../types";
import { reducer } from "../reducers/CitiesReducer";
import { Params } from "react-router-dom";

const initialContext: CitiesContextInterface = {
  cities: [],
  isLoading: false,
  currentCity: {
    cityName: "Lisbon",
    country: "Portugal",
    emoji: "🇵🇹",
    date: "2027-10-31T15:59:59.138Z",
    notes: "My favorite city so far!",
    position: {
      lat: 38.727881642324164,
      lng: -9.140900099907554,
    },
    id: 73930385,
  },
  fetchCurrentCity: () => undefined,
  createNewCity: () => undefined,
  removeCity: () => undefined,
};

const CitiesContext = createContext<CitiesContextInterface>(initialContext);

const initialState: InitialStateInterface = {
  cities: [],
  isLoading: false,
  currentCity: {
    cityName: "Lisbon",
    country: "Portugal",
    emoji: "🇵🇹",
    date: "2027-10-31T15:59:59.138Z",
    notes: "My favorite city so far!",
    position: {
      lat: 38.727881642324164,
      lng: -9.140900099907554,
    },
    id: 73930385,
  },
  error: "",
};

export function CitiesProvider({ children }: ProviderInterface) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer<
    Reducer<InitialStateInterface, ActionTypes>
  >(reducer, initialState);

  useEffect(() => {
    async function fetchCities(): Promise<void> {
      dispatch({ type: Actions.LOADING });
      try {
        const res = await fetch("http://localhost:9000/cities");
        const data = (await res.json()) as unknown as City[];
        dispatch({ type: Actions.CITIES_LOADED, payload: data });
      } catch (error) {
        dispatch({
          type: Actions.REJECTED,
          payload: "There was an error when loading the cities",
        });
        alert("There was an error when loading the cities");
      }
    }

    void fetchCities();
  }, []);

  const fetchCurrentCity = useCallback(async function fetchCurrentCity(
    id: Readonly<Params<string>>
  ): Promise<void> {
    try {
      if (id.id === undefined) throw new Error("Wrong city identification");
      dispatch({ type: Actions.LOADING });
      const res = await fetch(`http://localhost:9000/cities/${id.id}`);
      const data = (await res.json()) as unknown as City;
      dispatch({ type: Actions.CITY_LOADED, payload: data });
    } catch (error) {
      dispatch({
        type: Actions.REJECTED,
        payload: "There was an error when loading the city",
      });
      alert("There was an error when loading the city");
    }
  },
  []);

  async function createNewCity(newCity: City): Promise<void> {
    dispatch({ type: Actions.LOADING });
    try {
      const res = await fetch(`http://localhost:9000/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = (await res.json()) as unknown as City;

      dispatch({ type: Actions.CITY_CREATED, payload: data });
    } catch (error) {
      dispatch({
        type: Actions.REJECTED,
        payload: "There was an error when creacting city",
      });
      alert("There was an error when creacting city");
    }
  }

  async function removeCity(id: number | undefined): Promise<void> {
    try {
      if (id === undefined) throw new Error("Wrong city identification");
      dispatch({ type: Actions.LOADING });
      await fetch(`http://localhost:9000/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: Actions.CITY_DELETED, payload: id });
    } catch (error) {
      dispatch({
        type: Actions.REJECTED,
        payload: "There was an error when deleting city",
      });
      alert("There was an error when deleting city");
    }
  }

  const citiesValue: CitiesContextInterface = {
    cities,
    isLoading,
    currentCity,
    fetchCurrentCity,
    createNewCity,
    removeCity,
  };
  return (
    <CitiesContext.Provider value={citiesValue}>
      {children}
    </CitiesContext.Provider>
  );
}

export function useCitiesContext() {
  return useContext(CitiesContext);
}
