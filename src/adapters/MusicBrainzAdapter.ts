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