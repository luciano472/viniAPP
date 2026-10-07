import { Injectable } from '@angular/core';
import { Disco } from '../models/disco';

@Injectable({
  providedIn: 'root'
})
export class MusicbrainzService {

  async buscarPorCodigo(codigo: string): Promise<Disco | null> {
    if (codigo === '0000000000000') {
      return null; // para simular un código que no existe
    }
    return {
      id: Date.now().toString(),
      titulo: 'Disco de prueba',
      artista: 'Artista de prueba',
      anio: 2000,
      codigoBarras: codigo,
      fechaAlta: new Date().toISOString()
    };
  }
}