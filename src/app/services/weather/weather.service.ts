import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

interface WeatherData {
  name: string; // Ajout de la propriété name
  sys: {
    country: string;
  };
  dt: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
}

interface DailyForecast {
  dt: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  temp: {
    day: number;
    min: number;
    max: number;
  };
}

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private apiKey = 'c6f0d65854e982c4e793fa0e4115b797';
  private baseUrl = 'https://api.openweathermap.org/data/2.5';

  constructor(private http: HttpClient) {}

  getCurrentWeather(city: string): Observable<WeatherData> {
    return this.http.get<WeatherData>(
      `${this.baseUrl}/weather?q=${city}&appid=${this.apiKey}&units=metric&lang=fr`
    );
  }

  getHourlyForecast(city: string): Observable<WeatherData[]> {
    return this.http.get<{ list: WeatherData[] }>(
      `${this.baseUrl}/forecast?q=${city}&appid=${this.apiKey}&units=metric&lang=fr&cnt=8`
    ).pipe(
      map(res => res.list.slice(0, 8))
    );
  }

  getWeeklyForecast(city: string): Observable<DailyForecast[]> {
    return this.http.get<{ list: WeatherData[] }>(
      `${this.baseUrl}/forecast?q=${city}&appid=${this.apiKey}&units=metric&lang=fr&cnt=40`
    ).pipe(
      map(res => {
        const dailyData: DailyForecast[] = [];
        const days = new Set<string>();
        
        res.list.forEach(item => {
          const date = new Date(item.dt * 1000).toLocaleDateString();
          if (!days.has(date) && days.size < 7) {
            days.add(date);
            dailyData.push({
              dt: item.dt,
              weather: item.weather,
              temp: {
                day: item.main.temp,
                min: item.main.temp_min,
                max: item.main.temp_max
              }
            });
          }
        });
        
        return dailyData;
      })
    );
  }
}