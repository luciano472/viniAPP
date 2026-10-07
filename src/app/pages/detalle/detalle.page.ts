import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ColeccionService } from '../../services/coleccion';
import { Disco } from '../../models/disco';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
  standalone: false,
})
export class DetallePage {
  disco: Disco | null = null;
  cargando = false;
  noEncontrado = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coleccion: ColeccionService,
    private alertCtrl: AlertController,
    private cdr: ChangeDetectorRef
  ) {}

  async ionViewWillEnter() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.cargando = true;
    this.noEncontrado = false;
    this.disco = (await this.coleccion.obtenerDisco(id)) ?? null;
    this.noEncontrado = this.disco === null;
    this.cargando = false;
    this.cdr.detectChanges();
  }

  async confirmarEliminar() {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar disco',
      message: '¿Seguro que querés sacar este disco de tu colección?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Eliminar', role: 'destructive', handler: () => this.eliminar() },
      ],
    });
    await alert.present();
  }

  private async eliminar() {
    if (!this.disco) return;
    await this.coleccion.eliminarDisco(this.disco.id);
    this.router.navigate(['/home']);
  }
}