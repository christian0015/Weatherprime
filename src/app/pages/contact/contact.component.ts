import { Component, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, NgIf],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    message: ''
  };

  successMessage = '';
  errorMessage = '';

  constructor(private http: HttpClient) {}

  sendMessage() {
    const endpoint = 'https://weatherprime.vercel.app/send-email'; 
    this.http.post(endpoint, this.formData).subscribe({
      next: () => {
        this.successMessage = 'Message envoyé avec succès !';
        this.errorMessage = '';
        this.formData = { name: '', email: '', message: '' };
      },
      error: () => {
        this.errorMessage = 'Erreur lors de l’envoi. Réessayez plus tard.';
        this.successMessage = '';
      }
    });
  }
}
