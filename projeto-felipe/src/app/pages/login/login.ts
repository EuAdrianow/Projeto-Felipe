import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email = '';
  password = '';
  rememberMe = false;

  showPassword = false;
  isLoading = false;
  errorMessage = '';

  currentYear = new Date().getFullYear();

  constructor(private router: Router) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onLogin(form: NgForm): void {
    this.errorMessage = '';

    if (form.invalid) {
      form.control.markAllAsTouched();

      this.errorMessage =
        'Preencha corretamente o e-mail e a senha.';

      return;
    }

    if (this.isLoading) {
      return;
    }

    this.isLoading = true;

    const emailCorreto = 'adminsupremo@gmail.com';
    const senhaCorreta = 'oadmtaonfamil';

    const emailInformado = this.email.trim().toLowerCase();

    if (
      emailInformado === emailCorreto &&
      this.password === senhaCorreta
    ) {
      // Guarda apenas um estado demonstrativo de login.
      if (this.rememberMe) {
        localStorage.setItem('techpecLoggedIn', 'true');
        localStorage.setItem('techpecUser', emailCorreto);
      } else {
        sessionStorage.setItem('techpecLoggedIn', 'true');
        sessionStorage.setItem('techpecUser', emailCorreto);
      }

      // Redireciona para a página inicial da loja.
      this.router.navigate(['/']).then(() => {
        this.isLoading = false;
      });

      return;
    }

    this.errorMessage = 'E-mail ou senha incorretos.';
    this.isLoading = false;
  }

  logout(): void {
    localStorage.removeItem('techpecLoggedIn');
    localStorage.removeItem('techpecUser');

    sessionStorage.removeItem('techpecLoggedIn');
    sessionStorage.removeItem('techpecUser');

    this.router.navigate(['/login']);
  }
}