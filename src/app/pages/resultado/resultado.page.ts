import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicbrainzService } from '../../services/musicbrainz';
import { ColeccionService } from '../../services/coleccion';
import { Album } from '../../models/Album.types';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.page.html',
  styleUrls: ['./resultado.page.scss'],
  standalone: false,
})

export class ResultadoPage {
  albums: Album[] = [];
  cargando = false;
  noEncontrado = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private musicbrainz: MusicbrainzService,
    private coleccion: ColeccionService,
    private cdr: ChangeDetectorRef
  ) {}

  async ionViewWillEnter() {
    const codigo = this.route.snapshot.paramMap.get('codigo') ?? '';
    this.cargando = true;
    this.noEncontrado = false;
    this.albums = await this.musicbrainz.buscarPorCodigoDeBarras(codigo);
    this.noEncontrado = this.albums.length === 0;
    this.cargando = false;
    this.cdr.detectChanges();
  }

  async guardar(albumSeleccionado: Album) {
    if (this.albums.length === 0) return;
    await this.coleccion.agregarDisco(albumSeleccionado);
    this.router.navigate(['/home']);
  }

  cancelar() {
    this.router.navigate(['/scan']);
  }
}