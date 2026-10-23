import { Injectable } from '@angular/core';
import { Disco } from '../models/disco';
import { Album } from '../models/Album.types';

@Injectable({
  providedIn: 'root'
})
export class ColeccionService {

  private discos: Album[] = [

  ];

  async obtenerDiscos(): Promise<Album[]> {
    return [...this.discos];
  }

  async obtenerDisco(id: string): Promise<Album | undefined> {
    return this.discos.find(d => d.id === id);
  }

  async agregarDisco(album: Album): Promise<void> {
    this.discos.push(album);
  }

  async eliminarDisco(id: string): Promise<void> {
    this.discos = this.discos.filter(d => d.id !== id);
  }
}