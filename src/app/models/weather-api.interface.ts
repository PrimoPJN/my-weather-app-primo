
export interface WeatherFromAPI {
    base: string;
    clouds: {
      all: string;
    };
    cod: number;
    coord: {
      lat: number;
      lon: number;
    };
    dt: number;
    id: number;
    main: MainFromAPI;
    name: string;
    sys: {
      country: string;
      id: number;
      message: number;
      sunrise: number;
      sunset: number;
    };
    visibility: number;
    wind: {
      deg: number;
      speed: number;
    };
  }
  
  export interface MainFromAPI {
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  }
  