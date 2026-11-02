import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { ColeccionService } from '../../services/coleccion';
import { Disco } from '../../models/disco';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage {
  discos: Disco[] = [];
  cargando = false;
  nombre = '';
  totalDiscos = 0;
  totalArtistas = 0;
  ultimoDisco: Disco | null = null;
  busqueda = '';
  discosFiltrados: Disco[] = [];

  constructor(
    private coleccion: ColeccionService,
    private auth: Auth,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  async ionViewWillEnter() {
    this.cargando = true;
    this.discos = await this.coleccion.obtenerDiscos();
    this.calcularResumen();
    this.filtrar();
    this.nombre = this.armarNombre(await this.auth.obtenerEmail());
    this.cargando = false;
    this.cdr.detectChanges();
  }

  private calcularResumen() {
    this.totalDiscos = this.discos.length;
    this.totalArtistas = new Set(
      this.discos.map(d => d.artista.trim().toLowerCase())
    ).size;
    this.ultimoDisco = this.discos.length
      ? [...this.discos].sort((a, b) => b.fechaAlta.localeCompare(a.fechaAlta))[0]
      : null;
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
        this.normalizar(d.titulo).includes(texto) ||
        this.normalizar(d.artista).includes(texto)
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