import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicbrainzService } from '../../services/musicbrainz';
import { ColeccionService } from '../../services/coleccion';
import { Disco } from '../../models/disco';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.page.html',
  styleUrls: ['./resultado.page.scss'],
  standalone: false,
})

export class ResultadoPage {
  disco: Disco | null = null;
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
    this.disco = await this.musicbrainz.buscarPorCodigo(codigo);
    this.noEncontrado = this.disco === null;
    this.cargando = false;
    this.cdr.detectChanges();
  }

  async guardar() {
    if (!this.disco) return;
    await this.coleccion.agregarDisco(this.disco);
    this.router.navigate(['/home']);
  }

  cancelar() {
    this.router.navigate(['/scan']);
  }
}