import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  email = '';
  password = '';
  mensaje = '';
  cargando = false;

  constructor(private auth: Auth, private router: Router) { }

  async entrar() {
    if (!this.email || !this.password) {
      this.mensaje = 'Completá email y contraseña';
      return;
    }
    this.cargando = true;
    this.mensaje = '';
    const ok = await this.auth.login(this.email, this.password);
    this.cargando = false;
    if (ok) {
      this.router.navigate(['/home']);
    } else {
      this.mensaje = 'No se pudo iniciar sesión';
    }
  }

  async registrar() {
    if (!this.email || !this.password) {
      this.mensaje = 'Completá email y contraseña';
      return;
    }
    this.cargando = true;
    this.mensaje = '';
    const ok = await this.auth.registrar(this.email, this.password);
    this.cargando = false;
    this.mensaje = ok ? 'Cuenta creada, ahora podés ingresar' : 'No se pudo crear la cuenta';
  }
}