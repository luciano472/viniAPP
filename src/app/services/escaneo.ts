import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EscaneoService {

  async escanearCodigo(): Promise<string | null> {
    return '0123456789012';
  }
}