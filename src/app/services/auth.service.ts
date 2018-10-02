import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth = false;

  signIn() {
    // Création d'une prommesse pour simmuler la connection d'un utilisateur
    return new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            this.isAuth = true;
            resolve(true);
          }, 2000
        )
      })
  }

  signOut() {
    this.isAuth = false;
  }

  constructor() { }
}
