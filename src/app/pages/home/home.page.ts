import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { ColeccionService } from '../../services/coleccion';
import { Album } from '../../models/Album.types';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage {
  discos: Album[] = [];
  cargando = false;
  nombre = '';
  totalDiscos = 0;
  totalArtistas = 0;
  ultimoDisco: Album | null = null;
  busqueda = '';
  discosFiltrados: Album[] = [];

  constructor(
    private coleccion: ColeccionService,
    private auth: Auth,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  async ionViewWillEnter() {
    this.cargando = true;
    try {
      this.discos = await this.coleccion.obtenerDiscos();
      this.calcularResumen();
      this.filtrar();
      this.nombre = this.armarNombre(await this.auth.obtenerEmail());
    } catch (e) {
      console.error('Error al cargar la colección', e);
    } finally {
      this.cargando = false;
      this.cdr.detectChanges();
    }
  }

  private calcularResumen() {
    this.totalDiscos = this.discos.length;
    this.totalArtistas = new Set(
      this.discos.map(d => this.artistaDe(d).trim().toLowerCase())
    ).size;
    // Los discos se agregan al final de la lista, así que el último agregado es el último elemento
    this.ultimoDisco = this.discos.length ? this.discos[this.discos.length - 1] : null;
  }

  // Un Album puede venir sin artista; devolvemos '' para no romper
  artistaDe(album: Album): string {
    return album.artistCredit?.[0]?.name ?? '';
  }

  private armarNombre(email: string): string {
    const usuario = email.split('@')[0];
    return usuario ? usuario.charAt(0).toUpperCase() + usuario.slice(1) : '';
  }
  onBuscar(event: any) {
    this.busqueda = event.detail.value ?? '';
    this.filtrar();
  }

  filtrar() {
    const texto = this.normalizar(this.busqueda);
    this.discosFiltrados = texto
      ? this.discos.filter(d =>
        this.normalizar(d.title ?? '').includes(texto) ||
        this.normalizar(this.artistaDe(d)).includes(texto)
      )
      : [...this.discos];
  }
  private normalizar(texto: string): string {
    return texto
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
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
