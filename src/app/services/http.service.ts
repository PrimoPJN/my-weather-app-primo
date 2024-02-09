import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Weather } from '../models/weather.interface';
import { FiveDayForecast } from '../models/weather-detail.interface';

@Injectable()
export class HttpService {
  APP_KEY: string = `5cfa476d636f9e4cb33e1ea0a9ab58b4`;
  BASE_URL: string = `https://api.openweathermap.org/data/2.5`;
  
  constructor(private http: HttpClient) {}

  getWeather(city: string) {
    const url = `${this.BASE_URL}/weather?q=${city}&units=metric&appid=${this.APP_KEY}`;

    return this.http
      .get<{payload: Weather}>(url)
        .pipe(
          map(res => res),
          tap(data => console.log('server data: ', data)),
          catchError(this.handleError)
        );
  }

  getForecast(city: string): Observable<FiveDayForecast> {
    const url = `${this.BASE_URL}/forecast?q=${city}&units=metric&appid=${this.APP_KEY}`;
    
    return this.http.get<FiveDayForecast>(url);
  }

  handleError(error: { statusText: string; status: any; }) {
    const errMsg: string = error.statusText;
    if (error.status) {
      alert('Could not locate city, ' + errMsg); 
    }
    return errMsg;
  }

}
