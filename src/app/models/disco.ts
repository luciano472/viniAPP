export interface Disco {
  id: string;
  titulo: string;
  artista: string;
  anio?: number;
  codigoBarras: string;
  fechaAlta: string; // formato ISO
}