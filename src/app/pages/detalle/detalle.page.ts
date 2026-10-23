import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ColeccionService } from '../../services/coleccion';
import { Disco } from '../../models/disco';
import { Album } from '../../models/Album.types';
import { AlbumDetails } from '../../models/AlbumDetails.types';
import { MusicbrainzService } from '../../services/musicbrainz';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
  standalone: false,
})
export class DetallePage {
  disco: Album | null = null;
  detallesAlbum: AlbumDetails[] = [];
  cargando = false;
  noEncontrado = false;
  
  protected readonly Math = Math;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coleccion: ColeccionService,
    private alertCtrl: AlertController,
    private cdr: ChangeDetectorRef,
    private api: MusicbrainzService
  ) {}

  async ionViewWillEnter() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.cargando = true;
    this.noEncontrado = false;
    this.disco = await this.coleccion.obtenerDisco(id) ?? null;

    if (!this.disco || !this.disco.releaseGroup) {
      this.noEncontrado = true;
      this.cargando = false;
      return; 
    }

    try {
      this.detallesAlbum = await this.api.obtenerCanciones(this.disco.releaseGroup.id);
    } catch (error) {
      console.error(error);
    } finally {
      this.cargando = false;
      this.cdr.detectChanges();
    }
  }

  async confirmarEliminar() {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar disco',
      message: '¿Seguro que querés sacar este disco de tu colección?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Eliminar', role: 'destructive', handler: () => this.eliminar() },
      ]
    });
    await alert.present();
  }

  private async eliminar() {
    if (!this.disco) return;
    await this.coleccion.eliminarDisco(this.disco.id);
    this.router.navigate(['/home']);
  }
}