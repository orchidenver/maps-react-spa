import { InitialStateInterface, ActionTypes, Actions } from "../types";

export function reducer(
  state: InitialStateInterface,
  action: ActionTypes
): InitialStateInterface {
  switch (action.type) {
    case Actions.LOADING:
      return { ...state, isLoading: true };

    case Actions.CITIES_LOADED:
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case Actions.CITY_LOADED:
      return { ...state, isLoading: false, currentCity: action.payload };

    case Actions.CITY_CREATED:
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case Actions.CITY_DELETED:
      return {
        ...state,
        isLoading: false,
        cities: state?.cities?.filter((city) => city.id !== action.payload),
        currentCity: {
          cityName: "",
          country: "",
          emoji: "",
          date: "",
          notes: "",
          position: {
            lat: 0,
            lng: 0,
          },
          id: 0,
        },
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
}
