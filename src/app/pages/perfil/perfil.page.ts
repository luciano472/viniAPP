import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Auth } from '../../services/auth';
import { ColeccionService } from '../../services/coleccion';
import { Disco } from '../../models/disco';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false,
})
export class PerfilPage {
  email = '';
  nombre = '';
  inicial = '';

  cargando = true;
  totalDiscos = 0;
  totalArtistas = 0;
  decadaFavorita = '—';

  constructor(
    private auth: Auth,
    private coleccion: ColeccionService,
    private router: Router,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private cdr: ChangeDetectorRef
  ) { }

  async ionViewWillEnter() {
    this.cargando = true;
    try {
      this.email = await this.auth.obtenerEmail();
      this.armarIdentidad();
      const discos = await this.coleccion.obtenerDiscos();
      this.calcularEstadisticas(discos);
    } catch (e) {
      console.error('Error al cargar el perfil', e);
    } finally {
      this.cargando = false;
      this.cdr.detectChanges();
    }
  }

  // Del mail "ana@gmail.com" saca el nombre "Ana" y la inicial "A" para el avatar
  private armarIdentidad() {
    const usuario = this.email.split('@')[0];
    this.nombre = usuario ? usuario.charAt(0).toUpperCase() + usuario.slice(1) : '';
    this.inicial = this.nombre.charAt(0);
  }

  // Único lugar que conoce los campos del modelo de discos.
  // Si el modelo cambia (por ejemplo a Album), solo hay que tocar este método.
  private datosParaEstadisticas(d: Disco): { artista: string; anio?: number } {
    return { artista: d.artista, anio: d.anio };
  }

  private calcularEstadisticas(discos: Disco[]) {
    const datos = discos.map(d => this.datosParaEstadisticas(d));

    this.totalDiscos = datos.length;

    // Set descarta los repetidos; así "Pink Floyd" y "pink floyd " cuentan como uno
    this.totalArtistas = new Set(
      datos.map(d => d.artista.trim().toLowerCase()).filter(a => a !== '')
    ).size;

    // Cuenta cuántos discos hay por década (1969 -> 1960) y elige la que más tiene
    const porDecada = new Map<number, number>();
    for (const d of datos) {
      if (d.anio) {
        const decada = Math.floor(d.anio / 10) * 10;
        porDecada.set(decada, (porDecada.get(decada) ?? 0) + 1);
      }
    }
    const ranking = [...porDecada.entries()].sort((a, b) => b[1] - a[1] || a[0] - b[0]);
    this.decadaFavorita = ranking.length ? `${ranking[0][0]}s` : '—';
  }

  async cambiarPassword() {
    const alert = await this.alertCtrl.create({
      header: 'Cambiar contraseña',
      inputs: [
        { name: 'actual', type: 'password', placeholder: 'Contraseña actual' },
        { name: 'nueva', type: 'password', placeholder: 'Contraseña nueva' },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (datos) => {
            if (!datos.actual || !datos.nueva) {
              this.avisar('Completá los dos campos', 'danger');
              return false; // false = el cuadro queda abierto
            }
            if (datos.actual === datos.nueva) {
              this.avisar('La contraseña nueva tiene que ser distinta de la actual', 'danger');
              return false;
            }
            this.guardarPassword(datos.actual, datos.nueva);
            return true;
          },
        },
      ],
    });
    await alert.present();
  }

  private async guardarPassword(actual: string, nueva: string) {
    const resultado = await this.auth.cambiarPassword(actual, nueva);
    if (resultado === 'ok') {
      await this.avisar('Contraseña actualizada', 'success');
      return;
    }
    const mensajes: Record<string, string> = {
      incorrecta: 'La contraseña actual no es correcta',
      invalida: 'La contraseña nueva no cumple los requisitos de seguridad',
      limite: 'Demasiados intentos. Probá de nuevo en unos minutos',
      error: 'No se pudo cambiar la contraseña',
    };
    await this.avisar(mensajes[resultado], 'danger');
  }

  async confirmarCerrarSesion() {
    const alert = await this.alertCtrl.create({
      header: 'Cerrar sesión',
      message: '¿Querés salir de tu cuenta?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Cerrar sesión', role: 'destructive', handler: () => this.cerrarSesion() },
      ],
    });
    await alert.present();
  }

  private async cerrarSesion() {
    await this.auth.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  private async avisar(mensaje: string, color: 'success' | 'danger') {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 3500,
      color,
      position: 'bottom',
    });
    await toast.present();
  }
}
