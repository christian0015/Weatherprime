import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather/weather.service';
import { FormsModule } from '@angular/forms'; 
import { DatePipe, DecimalPipe, NgClass, NgFor, NgIf, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [FormsModule, NgIf, NgFor, DecimalPipe, DatePipe, NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  city = '';
  current: any;
  hourly: any[] = [];
  weekly: any[] = [];
  activeView: 'current' | 'hourly' | 'weekly' = 'current';
  isLoading = false;
  error = '';

  constructor(private weatherService: WeatherService) {}

  searchWeather() {
    if (!this.city) return;
    
    this.isLoading = true;
    this.error = '';
    
    this.weatherService.getCurrentWeather(this.city).subscribe({
      next: (data) => {
        // Reparation d'un leger soucis d'erreur system :)
        if (data.name.toLowerCase() === 'dakhla' && data.sys?.country?.toLowerCase() === 'eh') {
          data.sys.country = 'MA';
        }
        
        // Assignation avec toutes les vraies valeurs
        this.current = {
          ...data,
          sys: {
            ...data.sys,
            country: data.sys?.country || 'MA' // Fallback au cas où
          },
          flagUrl: `https://flagcdn.com/w40/${(data.sys?.country || 'MA').toLowerCase()}.png`
        };
        
        this.loadHourly();
        this.loadWeekly();
      },
      error: (err) => {
        this.error = 'Ville non trouvée';
        this.isLoading = false;
      }
    });
  }

  loadHourly() {
    this.weatherService.getHourlyForecast(this.city).subscribe({
      next: (data) => {
        this.hourly = data;
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  loadWeekly() {
    this.weatherService.getWeeklyForecast(this.city).subscribe({
      next: (data) => {
        this.weekly = data;
      },
      error: () => {}
    });
  }

  formatTime(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  formatDate(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleDateString([], { weekday: 'short', day: 'numeric' });
  }

   // Nouvelle méthode pour afficher correctement le pays
  getCountryCode(): string {
    if (this.current?.name?.toLowerCase() === 'dakhla' && this.current?.sys?.country === 'EH') {
      return 'MA';
    }
    return this.current?.sys?.country || '';
  }

  // Dans votre composant.ts
  getAlertType() {
    if (this.current.weather[0].main === 'Thunderstorm') return 'thunderstorm';
    if (this.current.main.temp > 35) return 'heat';
    if (this.current.main.temp < 0) return 'frost';
    return null;
  }

  hasAlert(): boolean {
  return (
    this.current?.weather[0]?.main === 'Thunderstorm' ||
    this.current?.main?.temp > 35 ||
    this.current?.main?.temp < 0
  );
}


}
