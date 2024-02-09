import { WeatherFromAPI } from "./weather-api.interface";
import { Weather } from "./weather.interface";

export interface DetailWeather {
    name: string;
    fiveDayForecast: Weather[];
}

export interface FiveDayForecast {
    city: City;
    cnt: number;
    code: number;
    list: WeatherFromAPI[];
}

export interface City {
    name: string;
    coord: Coord;
    country: string;
    id: number;
}

export interface Coord {
    lat: number;
    lon: number;
}