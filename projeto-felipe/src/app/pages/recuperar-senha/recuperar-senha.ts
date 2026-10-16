import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recuperar-senha',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './recuperar-senha.html',
  styleUrls: ['./recuperar-senha.css']
})
export class RecuperarSenha {
  email = '';
  isLoading = false;
  errorMessage = '';
  enviado = false;
  currentYear = new Date().getFullYear();

  onSubmit(form: NgForm): void {
    this.errorMessage = '';

    if (form.invalid) {
      form.control.markAllAsTouched();
      this.errorMessage = 'Informe um e-mail válido para continuar.';
      return;
    }

    if (this.isLoading) {
      return;
    }

    this.isLoading = true;

    // Simulação de envio (demonstração local, sem backend)
    window.setTimeout(() => {
      this.enviado = true;
      this.isLoading = false;
    }, 900);
  }

  tentarOutroEmail(): void {
    this.enviado = false;
    this.email = '';
    this.errorMessage = '';
  }
}