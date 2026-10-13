import { Injectable } from '@angular/core';
import {
  signUp, confirmSignUp, signIn, signOut,
  getCurrentUser, fetchUserAttributes
} from 'aws-amplify/auth';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  async login(email: string, password: string): Promise<boolean> {
    try {
      const { isSignedIn } = await signIn({ username: email, password });
      return isSignedIn;
    } catch (e: any) {
      if (e?.name === 'UserAlreadyAuthenticatedException') return true;
      console.error('Error en login', e);
      return false;
    }
  }

  async registrar(email: string, password: string): Promise<boolean> {
    try {
      await signUp({
        username: email,
        password,
        options: { userAttributes: { email } },
      });
      return true;
    } catch (e) {
      console.error('Error en registro', e);
      return false;
    }
  }

  async confirmarRegistro(email: string, codigo: string): Promise<boolean> {
    try {
      await confirmSignUp({ username: email, confirmationCode: codigo });
      return true;
    } catch (e) {
      console.error('Error al confirmar', e);
      return false;
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut();
    } catch (e) {
      console.error('Error al cerrar sesión', e);
    }
  }

  async estaLogueado(): Promise<boolean> {
    try {
      await getCurrentUser();
      return true;
    } catch {
      return false;
    }
  }

  async obtenerEmail(): Promise<string> {
    try {
      const atributos = await fetchUserAttributes();
      return atributos.email ?? '';
    } catch {
      return '';
    }
  }

  async obtenerUid(): Promise<string> {
    try {
      const usuario = await getCurrentUser();
      return usuario.userId;
    } catch {
      return '';
    }
  }
}