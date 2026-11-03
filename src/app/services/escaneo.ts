import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import {
  CapacitorBarcodeScanner,
  CapacitorBarcodeScannerCameraDirection,
  CapacitorBarcodeScannerTypeHint,
} from '@capacitor/barcode-scanner';

/**
 * EscaneoService: funcionalidad NATIVA de la app (cámara del dispositivo).
 * Es el único lugar que conoce el plugin del escáner; las páginas solo piden
 * "escaneá" y reciben el código de barras como texto.
 */
@Injectable({
  providedIn: 'root'
})
export class EscaneoService {

  // La cámara solo existe en el celular (Android/iOS). En el navegador de la PC no.
  disponible(): boolean {
    return Capacitor.isNativePlatform();
  }

  // Abre la cámara, lee un código de barras y lo devuelve.
  // Devuelve null si no se pudo leer, el usuario canceló o no hay cámara disponible.
  async escanearCodigo(): Promise<string | null> {
    if (!this.disponible()) {
      return null;
    }

    try {
      const resultado = await CapacitorBarcodeScanner.scanBarcode({
        hint: CapacitorBarcodeScannerTypeHint.ALL,
        scanInstructions: 'Apuntá la cámara al código de barras del disco',
        cameraDirection: CapacitorBarcodeScannerCameraDirection.BACK,
      });
      return resultado.ScanResult?.trim() || null;
    } catch (error) {
      // Se cae acá si el usuario niega el permiso de cámara o cierra el escáner
      console.error('Error al escanear:', error);
      return null;
    }
  }
}
