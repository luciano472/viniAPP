import { Album, ArtistCredit, Media } from "../app/models/Album.types";
import { AlbumDetails, MediaDetails, Track } from "../app/models/AlbumDetails.types";
import { AlbumReleases, Release, ReleaseEvent } from "../app/models/AlbumReleases.types";
import { Artist } from "../app/models/Artists.types";
import { Label, Tag } from "../app/models/RecordLabel.types";
import { Recording } from "../app/models/Song.types";
import {
  Release as ReleaseSong,
  ArtistCredit as  ArtistCreditSong
} from '../app/models/Song.types';

export class MusicBrainzAdapter{
  /**
   * Mapea el resultado de una consulta a un modelo mucho mas limpio y simplificado.
   * @param alb Objeto JSON con la respuesta del album. 
   * @param codigo Código de barras con el que buscamos el album, lo usamos para mapear un dato si es necesario.
   * @returns Retorna un Album con los datos que solamente necesitamos.
   */
  static toAlbum(alb: any, codigo: string): Album {
      return {
        id: alb.id,
        score: alb.score,
        title: alb.title || '',
        artistCredit: (alb["artist-credit"] || []).map((credit: any): ArtistCredit => ({
          name: credit.name || '',
          disambiguation: credit.artist?.disambiguation || ''
        })),
        releaseGroup: {
          id: alb["release-group"]?.id || '',
          title: alb["release-group"]?.title || ''
        },
        date: alb.date,
        country: alb.country || 'Desconocido',
        barcode: alb.barcode || codigo,
        media: (alb.media || []).map((med: any): Media => ({
          id: med.id || '',
          format: med.format || 'Desconocido',
          discCount: med["disc-count"] || 0,
          trackCount: med["track-count"] || 0
        }))
      };
  }
  
  /**
   * Extrae y mapea los detalles del album.
   * @param alb Es el dato en JSON que extraemos de la respuesta de la api.
   * @returns Retorna un modelo con los detalles de un album en específico.
   */
  static toAlbumDetails(alb: any): AlbumDetails{
    return {
      id: alb.id || '',
      barcode: alb.barcode || '',
      date: alb.date || '',
      disambiguation: alb.disambiguation || '',
      country: alb.country || 'Desconocido',
      title: alb.title || '',

      media: (alb.media || []).map((med: any): MediaDetails => ({
        trackCount: med["track-count"] || 0,
        format: med.format || 'Desconocido',
        position: med.position || 1,
        title: med.title || '',

      tracks: (med.tracks || []).map((track: any): Track => ({
        position: track.position || 0,
        number: track.number || '',
        title: track.title || '',
        length: track.length || 0,
        firstReleaseDate: track.recording?.["first-release-date"] || '',
        }))
      }))
    };
  }

  /**
   * Mapeamos los lanzamientos de un album.
   * @param rel Es una versión en JSON del album. Es la respuesta de la api.
   * @returns Retornamos un tipo AlbumRealeases.
   */
  static toAlbumReleases(rel: any): AlbumReleases{
    return {
        id: rel.id || '',
        releases: (rel.releases || []).map((r: any): Release => ({
          releaseEvents: (r['release-events'] || []).map((re: any): ReleaseEvent => ({
              nameArea: re.area?.name || '',
          })),
          barcode: r.barcode || '',
          disambiguation: r.disambiguation || '',
          title: r.title || '',
          date: r.date || ''
        })),
        firstReleaseDate: rel['first-release-date'] || '', 
        primaryType: rel['primary-type'] || '',
        title: rel.title || ''
      };
  }
  /**
   * Convierte la respuesta de un artista en un formato mucho mas limpio.
   * @param art Es un artista en version JSON que nos responde la api.
   * @returns Retornamos un tipo "Artista".
   */
  static toArtist(art: any): Artist{
    return {
      id: art.id || '',
      type: art.type || 'Desconocido',
      name: art.name || '',
      country: art.area.name || 'Desconocido',
      disambiguation: art.disambiguation || '',

      lifeSpan: {
        begin: art['life-span']?.begin || '',
        ended: art['life-span']?.ended ?? null,
        end: art['life-span']?.end || ''
      },
    
      tags: (art.tags || []).map((tag: any): Tag => ({
        count: tag.count || 0,
        name: tag.name || ''
      }))
    }
  }
  /**
   * Mapea una canción a un formato mucho mas limpio.
   * @param rec Es un canción que viene en JSON desde la api.
   * @returns Retorna un tipo "Recording".
   */
  static toRecording(rec: any): Recording{
    return {
      id: rec.id || '',
      title: rec.title || '',
      length: rec.length || 0,
      artistCredit: rec['artist-credit'].map((cred: any): ArtistCreditSong => ({
        name: cred.name || '',
        nameArtist: cred.artist.name || '' 
      })) || [],
      firstReleaseDate: rec['first-release-date'] || '',
      releases: rec.releases.map((rel: any): ReleaseSong => ({
        id: rel.id || '',
        title: rel.title || '',
        date: rec.date || '',
        country: rec.country || '',
      }))
    }
  }

  /**
   * Mapea la información de un sello discografico.
   * @param lab Es la información de un sello discografico en formato JSON.
   * @returns Retornamos un "Label".
   */
  static toLabel(lab: any): Label{
    return {
      id: lab.id || '',
      type: lab.type || '',
      name: lab.name || '',
      disambiguation: lab.disambiguation || '',
      country: lab.country || '',
      lifeSpan: lab['life-span'] || '',
      tags: lab.tags.map((tag: any): Tag => ({
        count: tag.count || 0,
        name: tag.name ||''
      }))
    }
  }
}