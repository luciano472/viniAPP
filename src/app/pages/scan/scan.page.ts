import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { EscaneoService } from '../../services/escaneo';
import { MusicbrainzService } from '../../services/musicbrainz';
import { Album } from '../../models/Album.types';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
  standalone: false,
})
export class ScanPage {
  codigoManual = '';
  mensaje = '';
  albums: Album[] = [];

  constructor(
    private escaneo: EscaneoService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private api: MusicbrainzService,
  ) {}

  async escanear() {
    this.mensaje = '';
    const codigo = await this.escaneo.escanearCodigo();
    if (codigo) {
      this.router.navigate(['/resultado', codigo]);
    } else {
      this.mensaje = 'No se pudo leer el código';
      this.cdr.detectChanges();
    }
  }

  async buscarAlbum() {
    const codigo = this.codigoManual.trim();
    if (!codigo) {
      this.mensaje = 'Ingresá un código de barras.';
      return;
    }

    this.mensaje = '';
    
    this.router.navigate(['/resultado', codigo]);
  }
}
