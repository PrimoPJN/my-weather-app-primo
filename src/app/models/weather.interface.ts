export interface Weather {
  zip?: string;
  name?: string;
  temp: number;
  icon: string;
  forecast: string;
  tempHigh: number;
  tempLow: number;
  date?: string;
}
