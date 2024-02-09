import { Component, OnInit } from '@angular/core';
import { DetailWeather } from '../models/weather-detail.interface';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http.service';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  detailWeather!: DetailWeather;
  constructor(private route: ActivatedRoute,
    private httpService: HttpService,
    private utilService: UtilService) { }

  ngOnInit() {
    this.detailWeather = {
      name: '',
      fiveDayForecast: []
    };

    this.route.params.subscribe(params => {
      const city = params['city'];
      this.getCityForecast(city);
    });
  }

  getCityForecast(city: string) {
    this.httpService.getForecast(city)
      .subscribe(
        data => {
          this.detailWeather = {
            name: data.city.name,
            fiveDayForecast: this.utilService.formatForecastObject(data.list, city)
          };
        }, error => {
          console.error(`An error occurred when retrieving weather data: ${error.message}`);
        }
    );
  }

}
