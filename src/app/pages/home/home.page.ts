import { Router } from '@angular/router';
import { ColeccionService } from '../../services/coleccion';
import { Disco } from '../../models/disco';
import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  discos: Disco[] = [];
  cargando = false;

  constructor(private coleccion: ColeccionService, private router: Router, private cdr: ChangeDetectorRef) {}

  async ionViewWillEnter() {
    this.cargando = true;
    this.discos = await this.coleccion.obtenerDiscos();
    this.cargando = false;
    this.cdr.detectChanges();
  }

  verDetalle(disco: Disco) {
    this.router.navigate(['/detalle', disco.id]);
  }

  escanear() {
    this.router.navigate(['/scan']);
  }

  irAPerfil() {
    this.router.navigate(['/perfil']);
  }

}
