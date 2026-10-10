import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

import { Header } from '../../componentes/header/header';
import { Menu } from '../../componentes/menu/menu';
import { Footer } from '../../componentes/footer/footer';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Header,
    Menu,
    Footer
  ],
  templateUrl: './contato.html',
  styleUrls: ['./contato.css']
})
export class Contato {
  currentYear = new Date().getFullYear();

  name = '';
  email = '';
  subject = '';
  message = '';

  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  onSubmit(form: NgForm): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (form.invalid) {
      form.control.markAllAsTouched();
      this.errorMessage =
        'Preencha corretamente todos os campos obrigatórios.';
      return;
    }

    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    this.successMessage =
      'Formulário validado!';

    this.isSubmitting = false;

  }

  clearMessages(): void {
    this.successMessage = '';
    this.errorMessage = '';
  }
}