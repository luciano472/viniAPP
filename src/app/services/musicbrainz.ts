import { Injectable } from '@angular/core';
import { Disco } from '../models/disco';
import { Album, Data } from '../models/Album.types';
import { AlbumDetails } from '../models/AlbumDetails.types';
import { AlbumReleases } from '../models/AlbumReleases.types';
import { Artist } from '../models/Artists.types';
import { Recording } from '../models/Song.types';
import { Label } from '../models/RecordLabel.types';
import { MusicBrainzAdapter } from '../../adapters/MusicBrainzAdapter';

@Injectable({
  providedIn: 'root'
})
export class MusicbrainzService {

  //URL PARA EL PERIODO DE DESARROLLO Y PRUEBA DESDE LAPC
  private baseUrlDev = '/ws/2/';

  private headers = {
    'Accept': 'application/json',
    'User-Agent': `ViniAPP/1.0 (email@gmail.com)`,
    'X-Requested-With': 'XMLHttpRequest' 
  }

  async buscarPorCodigoDeBarras(codigo: string): Promise<Album[]> {
    const url = `${this.baseUrlDev}release/?query=barcode:${codigo}&fmt=json`;

    return fetch(url, { headers: this.headers })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
      return response.json();   
      })
      .then((rawResponse: Data): Album[] => {
        if (!rawResponse.releases || rawResponse.releases.length === 0) {
          return [];
        }

      return rawResponse.releases.map((rel: Album): Album => {
        return MusicBrainzAdapter.toAlbum(rel, codigo);
      });
    });
  }
  
  async obtenerCanciones(idAlbum: string): Promise<AlbumDetails[]> {
    const url = `${this.baseUrlDev}release?release-group=${idAlbum}&inc=recordings+recording-level-rels&fmt=json`
    
    return fetch(url, { headers: this.headers })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
        return response.json();
      })
      .then((rawResponse: any): AlbumDetails[] => {
        if (!rawResponse.releases || rawResponse.releases.length === 0) {
          return [];
        }

        return rawResponse.releases.map((rel: any): AlbumDetails => {
          return MusicBrainzAdapter.toAlbumDetails(rel);
        });
      });
  }

  async obtenerVersiones(idAlbum: string): Promise<AlbumReleases[]>{
    const url = `${this.baseUrlDev}release-group/${idAlbum}?inc=releases&fmt=json`;

    return fetch(url, {headers: this.headers})
      .then(response => {
        if(!response.ok){
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
        return response.json();
      })
      .then((rawResponse: any): AlbumReleases[] => {
        if(!rawResponse.releases || rawResponse.releases.length === 0){
          return [];
        }

        return rawResponse.releases.map((rel: any): AlbumReleases => {
          return MusicBrainzAdapter.toAlbumReleases(rel);
        })
      })
  }

  async obtenerMusico(nombre: string): Promise<Artist[]> {
    if (!nombre || nombre.trim() === '') return [];

    const url = `${this.baseUrlDev}artist/?query=${encodeURIComponent(nombre.trim())}&fmt=json`;

    return fetch(url, { headers: this.headers })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
        return response.json();
      })
      .then((rawResponse: any): Artist[] => {
        if (!rawResponse.artists || rawResponse.artists.length === 0) {
          return [];
        }

        return rawResponse.artists.map((art: any): Artist => {
          return MusicBrainzAdapter.toArtist(art);
        })
      })
  }

  async buscarCancion(nombreCancion: string, nombreBanda: string): Promise<Recording[]>{
    const url = `${this.baseUrlDev}recording?query=${nombreCancion} AND artist=${nombreBanda}&fmt=json`

    return fetch(url, {headers: this.headers})
      .then(response => {
        if(!response.ok){
          throw new Error(`Error en la consulta: ${response.status}`)
        }

        return response.json();
      })
      .then((rawResponse: any): Recording[] => {
        if(rawResponse.recordings || rawResponse.recordings.length === 0){
          return [];
        }

        return rawResponse.recordings.map((rec: any): Recording => {
          return MusicBrainzAdapter.toRecording(rec);
        })
      })
  }

  async obtenerInformacionSelloDisco(nombreSello: string): Promise<Label[]>{
    const url = `${this.baseUrlDev}label?query=label:${nombreSello}&fmt=json`;

    return fetch(url, {headers: this.headers})
      .then(response => {
        if(!response.ok){
          throw new Error(`Error en la consulta: ${response.status}`);
        }
        
        return response.json();
      })
      .then((rawResponse: any): Label[] => {
        if(rawResponse.labels || rawResponse.labels.length === 0){
          return [];
        }

        return rawResponse.labels.map((lab: any): Label => {
          return MusicBrainzAdapter.toLabel(lab);
        })
      })
  }
}