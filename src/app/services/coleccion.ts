import { Injectable } from '@angular/core';
import {
  collection, deleteDoc, doc, getDoc, getDocs, getFirestore,
  orderBy, query, setDoc, DocumentData
} from 'firebase/firestore';
import { Album } from '../models/Album.types';
import { Auth } from './auth';

/**
 * ColeccionService: guarda la colección de discos de cada usuario en Firebase (Firestore).
 *
 * Estructura en la nube:  usuarios / {uid de Cognito} / discos / {id del Album}
 * - Cada usuario tiene su propia colección, separada de las de los demás.
 * - Se usa el id del Album como id del documento: guardar dos veces la misma
 *   edición la sobrescribe en vez de duplicarla.
 */
@Injectable({
  providedIn: 'root'
})
export class ColeccionService {

  // Conexión a Firestore (la app de Firebase se inicializa en main.ts)
  private db = getFirestore();

  constructor(private auth: Auth) {}

  // Devuelve la "carpeta" de discos del usuario que inició sesión
  private async discosRef() {
    const uid = await this.auth.obtenerUid();
    if (!uid) {
      throw new Error('No hay un usuario con sesión iniciada');
    }
    return collection(this.db, 'usuarios', uid, 'discos');
  }

  // Trae todos los discos, del más viejo al más nuevo
  async obtenerDiscos(): Promise<Album[]> {
    const consulta = query(await this.discosRef(), orderBy('agregadoEn'));
    const resultado = await getDocs(consulta);
    return resultado.docs.map(d => this.aAlbum(d.data()));
  }

  // Trae un disco por su id (o undefined si no existe)
  async obtenerDisco(id: string): Promise<Album | undefined> {
    const referencia = doc(await this.discosRef(), id);
    const documento = await getDoc(referencia);
    return documento.exists() ? this.aAlbum(documento.data()) : undefined;
  }

  // Guarda un disco. JSON.parse(JSON.stringify()) saca los campos "undefined",
  // que Firestore no acepta. "agregadoEn" sirve para ordenar por fecha de alta.
  async agregarDisco(album: Album): Promise<void> {
    const limpio = JSON.parse(JSON.stringify(album));
    const referencia = doc(await this.discosRef(), album.id);
    await setDoc(referencia, { ...limpio, agregadoEn: Date.now() });
  }

  async eliminarDisco(id: string): Promise<void> {
    await deleteDoc(doc(await this.discosRef(), id));
  }

  // Saca el campo auxiliar "agregadoEn" para devolver un Album limpio
  private aAlbum(datos: DocumentData): Album {
    const { agregadoEn, ...album } = datos;
    return album as Album;
  }
}
