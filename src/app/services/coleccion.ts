import { Injectable } from '@angular/core';
import { Disco } from '../models/disco';

@Injectable({
  providedIn: 'root'
})
export class ColeccionService {

  private discos: Disco[] = [
    { id: '1', titulo: 'Abbey Road', artista: 'The Beatles', anio: 1969,
      codigoBarras: '0000000000001', fechaAlta: new Date().toISOString() },
    { id: '2', titulo: 'The Dark Side of the Moon', artista: 'Pink Floyd', anio: 1973,
      codigoBarras: '0000000000002', fechaAlta: new Date().toISOString() },
  ];

  async obtenerDiscos(): Promise<Disco[]> {
    return [...this.discos];
  }

  async obtenerDisco(id: string): Promise<Disco | undefined> {
    return this.discos.find(d => d.id === id);
  }

  async agregarDisco(disco: Disco): Promise<void> {
    this.discos.push(disco);
  }

  async eliminarDisco(id: string): Promise<void> {
    this.discos = this.discos.filter(d => d.id !== id);
  }
}