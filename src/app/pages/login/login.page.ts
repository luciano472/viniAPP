import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  email = '';
  password = '';
  codigo = '';
  mensaje = '';
  esError = true;
  cargando = false;
  pendienteConfirmar = false;

  constructor(
    private auth: Auth,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  // Cada vez que se muestra el login, vuelve a su estado inicial
  ionViewWillEnter() {
    this.email = '';
    this.password = '';
    this.codigo = '';
    this.mensaje = '';
    this.esError = true;
    this.cargando = false;
    this.pendienteConfirmar = false;
    this.cdr.detectChanges();
  }

  async entrar() {
    if (!this.email || !this.password) {
      this.mostrar('Completá email y contraseña');
      return;
    }
    this.cargando = true;
    this.cdr.detectChanges();
    try {
      const ok = await this.auth.login(this.email, this.password);
      if (ok) {
        this.router.navigate(['/home']);
      } else {
        this.mostrar('No se pudo iniciar sesión. Revisá los datos o confirmá tu cuenta.');
      }
    } finally {
      this.cargando = false;
      this.cdr.detectChanges();
    }
  }

  async registrar() {
    if (!this.email || !this.password) {
      this.mostrar('Completá email y contraseña');
      return;
    }
    this.cargando = true;
    this.cdr.detectChanges();
    try {
      const resultado = await this.auth.registrar(this.email, this.password);
      if (resultado === 'ok') {
        this.irAConfirmar('Te enviamos un código a tu mail');
      } else if (resultado === 'existe') {
        // Si la cuenta quedó sin confirmar, el reenvío funciona; si ya estaba confirmada, falla
        const reenviado = await this.auth.reenviarCodigo(this.email);
        if (reenviado) {
          this.irAConfirmar('Esa cuenta estaba sin confirmar. Te mandamos un código nuevo');
        } else {
          this.mostrar('Ya existe una cuenta con ese mail. Probá ingresar.');
        }
      } else {
        this.mostrar('No se pudo crear la cuenta. Revisá que la contraseña cumpla los requisitos.');
      }
    } finally {
      this.cargando = false;
      this.cdr.detectChanges();
    }
  }

  async confirmar() {
    if (!this.codigo.trim()) {
      this.mostrar('Ingresá el código');
      return;
    }
    this.cargando = true;
    this.cdr.detectChanges();
    let ok = false;
    try {
      ok = await this.auth.confirmarRegistro(this.email, this.codigo.trim());
    } finally {
      this.cargando = false;
      this.cdr.detectChanges();
    }
    if (ok) {
      this.pendienteConfirmar = false;
      this.codigo = '';
      await this.entrar(); // ingresa solo con el mail y la contraseña ya escritos
    } else {
      this.mostrar('Código incorrecto o vencido');
    }
  }

  async reenviarCodigo() {
    const ok = await this.auth.reenviarCodigo(this.email);
    this.mostrar(ok ? 'Te mandamos un código nuevo' : 'No se pudo reenviar el código', !ok);
  }

  mostrarConfirmacion() {
    if (!this.email) {
      this.mostrar('Escribí tu email para confirmar la cuenta');
      return;
    }
    this.irAConfirmar('');
  }

  volver() {
    this.pendienteConfirmar = false;
    this.codigo = '';
    this.mensaje = '';
    this.cdr.detectChanges();
  }

  private irAConfirmar(aviso: string) {
    this.codigo = '';
    this.pendienteConfirmar = true;
    this.mostrar(aviso, false);
  }

  private mostrar(texto: string, error = true) {
    this.mensaje = texto;
    this.esError = error;
    this.cdr.detectChanges();
  }
}