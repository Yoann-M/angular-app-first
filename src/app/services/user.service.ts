import { Injectable } from '@angular/core';
import { User } from '../models/User.Model';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  private users: User[] = [
    {
      firstname: 'Yoann',
       lastname: 'Miotto' ,
       email: 'mon@email.com',
       drinkPreference: 'Pérrier Citron Vert',
       hobbies: [
         'télé','code','sieste'
       ]
    }
  ];
  userSubject = new Subject<User[]>();

  emitUsers() {
    this.userSubject.next(this.users.slice());
  }
  
  
  addUser(user: User){
    this.users.push(user);
    this.emitUsers();
  }

}
