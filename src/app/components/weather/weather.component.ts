import { Component, Input } from '@angular/core';
import { Weather } from '../../models/weather.interface';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  @Input() city!: Weather;
  
  constructor() { }

}
