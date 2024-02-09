import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-weather-add',
  templateUrl: './weather-add.component.html',
  styleUrls: ['./weather-add.component.css']
})
export class WeatherAddComponent {
  form!: FormGroup;
  @Output() onAddCity: EventEmitter<string> = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {
      this.form = this.fb.group({
        txtCityName: ['', [
          Validators.required, 
          Validators.maxLength(20),
          Validators.pattern('[a-z]')
        ]
      ]
    });
  }

  addCity(city: string) {
    this.onAddCity.emit(city);
    this.form.controls['txtCityName'].setValue("");
  }
}
