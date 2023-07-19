import { LatLngExpression } from "leaflet";
import { MouseEventHandler } from "react";
import { Params } from "react-router-dom";

export interface CityProp {
  city: City;
}

export interface City {
  cityName: string;
  country: string;
  emoji?: string;
  date: string;
  notes: string;
  position: Position;
  id?: number;
}

export interface Position {
  lat: number;
  lng: number;
}

export interface Country {
  country: string;
  emoji: string;
}

export interface CountryProps {
  country: Country;
}

export interface ButtonProps {
  children: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type: string;
}

export interface InitialStateInterface {
  cities: City[] | null | undefined;
  isLoading: boolean;
  currentCity: City;
  error?: string;
}

export interface CitiesContextInterface extends InitialStateInterface {
  fetchCurrentCity: (id: Readonly<Params<string>>) => void;
  createNewCity: (newCity: City) => void;
  removeCity: (id: number | undefined) => void;
}

export interface CitiesProviderInterface {
  children: JSX.Element;
}

export interface LocationProps {
  position: LatLngExpression;
}

export interface GeoPosition {
  defaultPosition: {
    lat: number;
    lng: number;
  } | null;
}

export interface CityLocation {
  city: string;
  continent: string;
  continentCode: string;
  countryCode: string;
  countryName: string;
  latitude: number;
  locality: string;
  localityInfo: LocalityInfo;
  localityLanguageRequested: string;
  longitude: number;
  lookupSource: string;
  plusCode: string;
  postcode: string;
  principalSubdivision: string;
  principalSubdivisionCode: string;
}

export interface LocalityInfo {
  LikelyLand: boolean;
  administrative: any[];
  informative: any[];
}

export enum Actions {
  LOADING = "loading",
  CITIES_LOADED = "cities/loaded",
  CITY_LOADED = "city/loaded",
  CITY_CREATED = "city/created",
  CITY_DELETED = "city/deleted",
  REJECTED = "rejected",
}

export type ActionTypes =
  | {
      type: Actions.LOADING;
    }
  | {
      type: Actions.CITIES_LOADED;
      payload: City[] | null | undefined;
    }
  | {
      type: Actions.CITY_LOADED;
      payload: City;
    }
  | {
      type: Actions.CITY_CREATED;
      payload: City;
    }
  | {
      type: Actions.CITY_DELETED;
      payload: number | undefined;
    }
  | {
      type: Actions.REJECTED;
      payload: string;
    };
