import { Album, ArtistCredit, Media } from "../app/models/Album.types";
import { AlbumDetails, MediaDetails, Track } from "../app/models/AlbumDetails.types";
import { AlbumReleases, Release, ReleaseEvent } from "../app/models/AlbumReleases.types";
import { Artist } from "../app/models/Artists.types";
import { Alias, Label, Tag } from "../app/models/RecordLabel.types";
import { Recording } from "../app/models/Song.types";
import {
  Release as ReleaseSong,
  Track as TrackSong,
  Media as MediaSong,
} from '../app/models/Song.types';

export class MusicBrainzAdapter{
  static toAlbum(alb: any, codigo: string): Album {
      return {
        id: alb.id,
        score: alb.score,
        count: alb.count,
        title: alb.title || '',
        status: alb.status || 'Desconocido',
        packaging: alb.packaging || 'Desconocido',
        
        artistCredit: (alb["artist-credit"] || []).map((credit: any): ArtistCredit => ({
          name: credit.name || '',
          artist: {
            id: credit.artist?.id || '',
            name: credit.artist?.name || '',
            disambiguation: credit.artist?.disambiguation || ''
          }
        })),
        releaseGroup: {
          id: alb["release-group"]?.id || '',
          title: alb["release-group"]?.title || ''
        },
        date: alb.date,
        country: alb.country || 'Desconocido',
        barcode: alb.barcode || codigo,
        
        trackCount: alb["track-count"] || 0,
        
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
      status: alb.status || 'Desconocido',
      id: alb.id || '',
      barcode: alb.barcode || '',
      date: alb.date || '',
      disambiguation: alb.disambiguation || '',
      asin: alb.asin || null,
      country: alb.country || 'Desconocido',
      title: alb.title || '',
      packaging: alb.packaging || null,
      quality: alb.quality || 'normal',

      media: (alb.media || []).map((med: any): MediaDetails => ({
        trackOffset: med["track-offset"] || 0,
        trackCount: med["track-count"] || 0,
        format: med.format || 'Desconocido',
        id: med.id || '',
        position: med.position || 1,
        title: med.title || '',

      tracks: (med.tracks || []).map((track: any): Track => ({
        id: track.id || '',
        position: track.position || 0,
        number: track.number || '',
        title: track.title || '',
        length: track.length || 0,

        recording: {
          id: track.recording?.id || '',
          title: track.recording?.title || '',
          length: track.recording?.length || 0,
          disambiguation: track.recording?.disambiguation || '',
          firstReleaseDate: track.recording?.["first-release-date"] || '',
          video: !!track.recording?.video
          }
        }))
      }))
    };
  }

  static toAlbumReleases(rel: any): AlbumReleases{
    return {
        id: rel.id || '',
        releases: (rel.releases || []).map((r: any): Release => ({
          quality: r.quality || '',
          id: r.id || '',
          releaseEvents: (r['release-events'] || []).map((re: any): ReleaseEvent => ({
            area: {
              name: re.area?.name || '',
              type: re.area?.type || null,
              id: re.area?.id || '',
              disambiguation: re.area?.disambiguation || '',
            },
            date: re.date || ''
          })),
          barcode: r.barcode || '',
          disambiguation: r.disambiguation || '',
          title: r.title || '',
          status: r.status || 'Desconocido',
          country: r.country || 'Desconocido',
          packaging: r.packaging || null,
          date: r.date || ''
        })),
        firstReleaseDate: rel['first-release-date'] || '', 
        disambiguation: rel.disambiguation || '',
        primaryType: rel['primary-type'] || '',
        title: rel.title || ''
      };
  }

  static toArtist(art: any): Artist{
    return {
      id: art.id || '',
      type: art.type || 'Desconocido',
      score: art.score || 0,
      name: art.name || '',
      country: art.country || 'Desconocido',
      disambiguation: art.disambiguation || '',
    
      area: art.area ? {
        id: art.area.id || '',
        type: art.area.type || 'Desconocido',
        name: art.area.name || ''
      } : undefined,
    
      beginArea: art['begin-area'] ? {
        id: art['begin-area'].id || '',
        type: art['begin-area'].type || 'Desconocido',
        name: art['begin-area'].name || ''
      } : undefined,
    
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
      score: rec.score || 0,
      title: rec.title || '',
      length: rec.length || 0,
      artistCredit: rec['artist-credit'].map((cred: any): ArtistCredit => ({
        name: cred.name || '',
        artist: {
          id: cred.artist.id || '',
          name: cred.artist.name || '',
          disambiguation: cred.artist.disambiguation || ''
        }
      })) || [],
      firstReleaseDate: rec['first-release-date'] || '',
      releases: rec.releases.map((rel: any): ReleaseSong => ({
        id: rel.id || '',
        count: rel.count || 0,
        title: rel.title || '',
        status: rel.status || '',
        artistCredit: rel['artist-credit'].map((cred: any): ArtistCredit => ({
          name: cred.name || '',
          artist: {
            id: cred.artist.id || '',
            name: cred.artist.name || '',
            disambiguation: cred.artist.disambiguation || ''
          }
        })),
        releaseGroup: {
          id: rec['release-group'].id || '',
          title: rec['release-group'].title || ''
        },
        date: rec.date || '',
        country: rec.country || '',
        releaseEvents: rec['release-events'].map((re: any): ReleaseEvent => ({
          date: re.date || '',
          area: {
            id: re.area.id || '',
            name: re.area.name || '',
            type: re.area.type || '',
            disambiguation: re.area.disambiguation || ''
          }  
        })),
        trackCount: rec['track-count'] || 0,
        media: rec.media.map((med: any): MediaSong => ({
          id: med.id || '',
          position: med.position || 0,
          format: med.format || '',
          track: med.track.map((tr: any): TrackSong => ({
            id: tr.id || '',
            number: tr.number || '',
            title: tr.title || '',
            length: tr.length || 0
          })),
          trackCount: med['track-count'] || 0,
          trackOffset: med['track-offset'] || 0
        }))
      }))
    }
  }

  static toLabel(lab: any): Label{
    return {
      id: lab.id || '',
      type: lab.type || '',
      score: lab.score || 0,
      name: lab.name || '',
      labelCode: lab['label-code'] || 0,
      disambiguation: lab.disambiguation || '',
      country: lab.country || '',
      area: {
        id: lab.area.id || '',
        type: lab.area.type || '',
        name: lab.area.name || ''
      },
      lifeSpan: lab['life-span'] || '',
      aliases: lab.aliases.map((al: any): Alias => ({
        name: al.name || '',
        locale: al.locale || null,
        type: al.type || null,
        primary: al.primary || null,
        beginDate: al['begin-date'] || null,
        endDate: al['end-date'] || null
      })),
      tags: lab.tags.map((tag: any): Tag => ({
        count: tag.count || 0,
        name: tag.name ||''
      }))
    }
  }
}