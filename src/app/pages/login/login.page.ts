import { ChangeDetectorRef, Component } from '@angular/core';
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
  codigo = '';
  mensaje = '';
  cargando = false;
  pendienteConfirmar = false;

  constructor(
    private auth: Auth,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  async entrar() {
    if (!this.email || !this.password) {
      this.mostrar('Completá email y contraseña');
      return;
    }
    this.cargando = true;
    const ok = await this.auth.login(this.email, this.password);
    this.cargando = false;
    if (ok) {
      this.router.navigate(['/home']);
    } else {
      this.mostrar('No se pudo iniciar sesión. Revisá los datos o confirmá tu cuenta.');
    }
  }

  async registrar() {
    if (!this.email || !this.password) {
      this.mostrar('Completá email y contraseña');
      return;
    }
    this.cargando = true;
    const ok = await this.auth.registrar(this.email, this.password);
    this.cargando = false;
    if (ok) {
      this.pendienteConfirmar = true;
      this.mostrar('Te enviamos un código por mail. Ingresalo para confirmar tu cuenta.');
    } else {
      this.mostrar('No se pudo crear la cuenta. Revisá que la contraseña cumpla los requisitos.');
    }
  }

  async confirmar() {
    if (!this.codigo) {
      this.mostrar('Ingresá el código');
      return;
    }
    this.cargando = true;
    const ok = await this.auth.confirmarRegistro(this.email, this.codigo);
    this.cargando = false;
    if (ok) {
      this.pendienteConfirmar = false;
      this.codigo = '';
      this.mostrar('Cuenta confirmada, ya podés ingresar');
    } else {
      this.mostrar('Código incorrecto o vencido');
    }
  }

  private mostrar(texto: string) {
    this.mensaje = texto;
    this.cdr.detectChanges();
  }
}