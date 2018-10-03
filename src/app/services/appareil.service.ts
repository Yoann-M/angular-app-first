import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AppareilService {

  constructor(private httpClient: HttpClient) { }

  appareilSubject = new Subject<any[]>();

  private appareils = [];

  emitAppareilSubject() {
    // on transmet une copie du tableau appareil avec slice
    this.appareilSubject.next(this.appareils.slice())
  }

  getAppareilById(id: number) {
    const appareil = this.appareils.find(
      (appareilObject) => {
        return appareilObject.id === id
      }
    );
    return appareil;
  }

  switchOnAll() {
    for (let appareil of this.appareils) {
      appareil.status = 'allumé'
    }
    this.emitAppareilSubject();
  }

  switchOffAll() {
    for (let appareil of this.appareils) {
      appareil.status = 'éteint'
    }
    this.emitAppareilSubject();
  }

  switchOnOne(index: number) {
    this.appareils[index].status = 'allumé';
    this.emitAppareilSubject();
  }

  switchOffOne(index: number) {
    this.appareils[index].status = 'éteint';
    this.emitAppareilSubject();
  }

  addAppareil(name: string, status: string) {
    const appareilObject = {
      id: 0,
      name: '',
      status: ''
    }
    appareilObject.name = name;
    appareilObject.status = status;
    appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;
    this.appareils.push(appareilObject);
    this.emitAppareilSubject();
  }
  
  private urlFirebase: string = ''

  saveAppareilToServer() {
    this.httpClient
      .put(this.urlFirebase, this.appareils)
      .subscribe(
        () => {
          console.log('Enregistré avec success')
        },
        (error) => {
          console.log('Erreur de sauvegarde ' + error)
        }
      )
  }

  getAppareilFromServer() {
    this.httpClient
      .get<any[]>(this.urlFirebase)
      .subscribe(
        (response) => {
          this.appareils = response;
          this.emitAppareilSubject();
        },
        (error) => {
          console.log('Erreur de récupération ' + error)
        }
      )
  }
}
