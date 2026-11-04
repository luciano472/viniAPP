import { Injectable } from '@angular/core';
import { Disco } from '../models/disco';
import { Album, Data } from '../models/Album.types';
import { AlbumDetails } from '../models/AlbumDetails.types';
import { AlbumReleases } from '../models/AlbumReleases.types';
import { Artist } from '../models/Artists.types';
import { Recording } from '../models/Song.types';
import { Label } from '../models/RecordLabel.types';
import { MusicBrainzAdapter } from '../../adapters/MusicBrainzAdapter';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MusicbrainzService {
  //URL PARA EL PERIODO DE DESARROLLO Y PRUEBA DESDE LAPC
  private baseUrlDev = '/ws/2/';

  constructor(private http: HttpClient) {}

  private headers = {
    Accept: 'application/json',
    'User-Agent': `ViniAPP/1.0 (email@gmail.com)`,
    'X-Requested-With': 'XMLHttpRequest',
  };


/**
 * Busca álbumes de la api MusicBraiz utilizando un código de barras.
 * @param codigo El código de barras del album a buscar.
 */
  buscarPorCodigoDeBarras(codigo: string): Observable<Album[]> {
    const url = `${this.baseUrlDev}release/?query=barcode:${codigo}&fmt=json`;

    return this.http.get(url, { headers: this.headers }).pipe(
      map((rawResponse: any): Album[] => {
        if (!rawResponse.releases || rawResponse.releases.length === 0) {
          return [];
        }

        return rawResponse.releases.map((rel: any): Album => {
          return MusicBrainzAdapter.toAlbum(rel, codigo);
        });
      }),
    );
  }

  /**
   * Obtiene informacion detallada de un álbum utilizando su id.
   * @param idAlbum Es el identificador(ID) del album.
   */
  obtenerCanciones(idAlbum: string): Observable<AlbumDetails[]> {
    const url = `${this.baseUrlDev}release?release-group=${idAlbum}&inc=recordings+recording-level-rels&fmt=json`;

    return this.http.get(url, { headers: this.headers }).pipe(
      map((rawResponse: any): AlbumDetails[] => {
        if (!rawResponse.releases || rawResponse.releases.length === 0) {
          return [];
        }

        return rawResponse.releases.map((rel: any): AlbumDetails => {
          return MusicBrainzAdapter.toAlbumDetails(rel);
        });
      }),
    );
  }

  /**
   * Consulta sobre otras versiones de un album.
   * @param idAlbum Es el identificador(ID) del album.
   */
  obtenerVersiones(idAlbum: string): Observable<AlbumReleases[]> {
    const url = `${this.baseUrlDev}release-group/${idAlbum}?inc=releases&fmt=json`;

    return this.http.get(url, { headers: this.headers }).pipe(
      map((rawResponse: any): AlbumReleases[] => {
        if (!rawResponse.releases || rawResponse.releases.length === 0) {
          return [];
        }
        return rawResponse.releases.map((rel: any): AlbumReleases => {
          return MusicBrainzAdapter.toAlbumReleases(rel);
        });
      }),
    );
  }

  /**
   * Obtiene información sobre un artista, buscandolo por su nombre.
   * @param nombre El nombre del artista a buscar.
   */
  obtenerMusico(nombre: string): Observable<Artist[]> {
    const url = `${this.baseUrlDev}artist/?query=${encodeURIComponent(nombre.trim())}&fmt=json`;

    return this.http.get(url, { headers: this.headers }).pipe(
      map((rawResponse: any): Artist[] => {
        if (!rawResponse.artists || rawResponse.artists.length === 0) {
          return [];
        }
        return rawResponse.artists.map((art: any): Artist => {
          return MusicBrainzAdapter.toArtist(art);
        });
      }),
    );
  }

  /**
   * Busca detalles sobre una canción.
   * @param nombreCancion El nombre de la canción.
   * @param nombreBanda El nombre de la banda.
   */
  buscarCancion(nombreCancion: string, nombreBanda: string): Observable<Recording[]> {
    const url = `${this.baseUrlDev}recording?query=${nombreCancion} AND artist=${nombreBanda}&fmt=json`;

    return this.http.get(url, { headers: this.headers }).pipe(
      map((rawResponse: any): Recording[] => {
        if (!rawResponse.recordings || rawResponse.recordings.length === 0) {
          return [];
        }
        return rawResponse.recordings.map((rec: any): Recording => {
          return MusicBrainzAdapter.toRecording(rec);
        });
      }),
    );
  }

  /**
   * Busca un sello discografico por su nombre.
   * @param nombreSello El nombre del sello discofrafico.
   */
  obtenerInformacionSelloDisco(nombreSello: string): Observable<Label[]> {
    const url = `${this.baseUrlDev}label?query=label:${nombreSello}&fmt=json`;

    return this.http.get(url, { headers: this.headers }).pipe(
      map((rawResponse: any): Label[] => {
        if (!rawResponse.labels || rawResponse.labels.length === 0) {
          return [];
        }
        return rawResponse.labels.map((lab: any): Label => {
          return MusicBrainzAdapter.toLabel(lab);
        });
      }),
    );
  }
}
