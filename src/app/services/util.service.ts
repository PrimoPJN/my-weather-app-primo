import { Injectable } from '@angular/core';
import { WeatherFromAPI } from '../models/weather-api.interface';
import { Weather } from '../models/weather.interface';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  constructor() { 

  }

  formatDataWeather(data: any, city: string) {
    let date = '';
  
    if (data.hasOwnProperty('dt_txt')) {
      date = data.dt_txt.split(' ')[0].slice(5);
    }
  
    const citydata = {
      name: data['name'],
      temp: this.formatTemp(data['main']['temp']),
      icon: data['weather'][0]['main'],
      forecast: data['weather'][0]['description'],
      tempHigh: this.formatTemp(data['main']['temp_max']),
      tempLow:  this.formatTemp(data['main']['temp_min']),
      humidity: data['main']['humidity'],
      date: date
    };
    return citydata;
  }

  formatTemp(value: string) : number {
    return Math.round( Number(value) );
  }

  formatForecastObject(fiveDayForecast: WeatherFromAPI[], city: string): Weather[] {
    const formatedForecast = [];
    for (let i = 4; i < fiveDayForecast.length; i += 8) {
        const tempObj = this.formatDataWeather(fiveDayForecast[i], city);
        formatedForecast.push(tempObj);
    }

    return formatedForecast;
  }

}
