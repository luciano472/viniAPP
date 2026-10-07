import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false,
})
export class PerfilPage {
  email = '';

  constructor(private auth: Auth, private router: Router, private cdr: ChangeDetectorRef) {}

  ionViewWillEnter() {
    this.email = this.auth.obtenerEmail();
    this.cdr.detectChanges();
  }

  cerrarSesion() {
    this.auth.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}