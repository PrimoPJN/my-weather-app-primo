import { Component, OnInit, OnDestroy} from '@angular/core';
import { Weather } from '../models/weather.interface';
import { HttpService } from '../services/http.service';
import { UtilService } from '../services/util.service';
import { Subscription } from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  initCities: string[] = [];
  cities: Weather[] = [];
  subscription: Subscription = new Subscription;
  form!: FormGroup;

  constructor(public httpService: HttpService,
    private utilService: UtilService,
    private fb: FormBuilder) {
      this.form = this.fb.group({
        txtCity: ['', [
          Validators.required, 
          Validators.maxLength(20),
          Validators.pattern('[a-z]')
        ]
      ]
    });
  }

  ngOnInit() {
    this.cities = [];
    this.initCities = this.utilService.getStoredCities();
    
    if (this.initCities == null || this.initCities.length == 0) {
      this.initCities = ['sao paulo', 'rio de janeiro', 'new york'];
    }
    this.getInitCityWeather();
  }

  getInitCityWeather() {
    this.initCities.map(city => {
      this.showWeather(city);
    });
  }

  addWeatherByCity(city: string) {
    this.initCities.push(city);
    this.utilService.setStoredCities(this.initCities);
    this.showWeather(city);
  }

  showWeather(city: string){
    this.httpService.getWeather(city).subscribe(response => {
      const citydata = this.utilService.formatDataWeather(response, city);
      this.cities.push(citydata);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
