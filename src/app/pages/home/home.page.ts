import { Router } from '@angular/router';
import { ColeccionService } from '../../services/coleccion';
import { Disco } from '../../models/disco';
import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Album } from '../../models/Album.types';
import { AlbumReleases } from '../../models/AlbumReleases.types';
import { Artist } from '../../models/Artists.types';
import { MusicbrainzService } from '../../services/musicbrainz';
import { Recording } from '../../models/Song.types';
import { Label } from '../../models/RecordLabel.types';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  discos: Album[] = [];
  cargando = false;

  constructor(private coleccion: ColeccionService, private router: Router, private cdr: ChangeDetectorRef, private mbz: MusicbrainzService) {}

  async ionViewWillEnter() {
    this.cargando = true;
    this.discos = await this.coleccion.obtenerDiscos();
    this.cargando = false;
    this.cdr.detectChanges();
  }

  verDetalle(disco: Album) {
    this.router.navigate(['/detalle', disco.id]);
  }

  escanear() {
    this.router.navigate(['/scan']);
  }

  irAPerfil() {
    this.router.navigate(['/perfil']);
  }
}
