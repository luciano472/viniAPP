import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { EscaneoService } from '../../services/escaneo';

/**
 * ScanPage: pantalla para cargar un disco nuevo.
 * Hay dos caminos: escanear el código de barras con la cámara o escribirlo a mano.
 * En ambos casos solo obtiene el código y navega a /resultado/:codigo;
 * la búsqueda en MusicBrainz la hace la página de resultados.
 */
@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
  standalone: false,
})
export class ScanPage {
  codigoManual = '';
  mensaje = '';

  constructor(
    private escaneo: EscaneoService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  // Camino 1: cámara
  async escanear() {
    this.mensaje = '';

    if (!this.escaneo.disponible()) {
      this.mensaje = 'El escáner funciona solo en el celular. Ingresá el código a mano.';
      this.cdr.detectChanges();
      return;
    }

    const codigo = await this.escaneo.escanearCodigo();
    if (codigo) {
      this.router.navigate(['/resultado', codigo]);
    } else {
      this.mensaje = 'No se pudo leer el código';
      this.cdr.detectChanges();
    }
  }

  // Camino 2: código escrito a mano
  buscarAlbum() {
    const codigo = this.codigoManual.trim();
    if (!codigo) {
      this.mensaje = 'Ingresá un código de barras.';
      this.cdr.detectChanges();
      return;
    }
    this.mensaje = '';
    this.router.navigate(['/resultado', codigo]);
  }
}
