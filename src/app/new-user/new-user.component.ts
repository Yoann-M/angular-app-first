import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/User.model';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  userform: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.userform = this.formbuilder.group({
      firstname: '',
      lastname: '',
      email: '',
      drinkPreferences: '',
      hobbies: []
    })
  }

  onSubmitForm() {
    const formValue = this.userform.value;
    const newUser = new User(
      formValue['firstname'],
      formValue['lasttname'],
      formValue['email'],
      formValue['drinkPreference']
    );
    this.userService.addUser(newUser);
    this.router.navigate(['user-list'])
  }

}
