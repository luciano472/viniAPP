import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private logueado = false;
  private email = '';

  async login(email: string, password: string): Promise<boolean> {
    this.logueado = true;
    this.email = email;
    return true;
  }

  async registrar(email: string, password: string): Promise<boolean> {
    return true;
  }

  logout() {
    this.logueado = false;
    this.email = '';
  }

  estaLogueado(): boolean {
    return this.logueado;
  }

  obtenerEmail(): string {
    return this.email;
  }
}