import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { UserService, IDjangoUserADD, IDjangoUser } from 'src/app/user/services';

export interface TypeUser {
  value: boolean;
  viewValue: string;
}

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  createForm: any;

  selected = false;
  userStaff: TypeUser[] = [
    { value: false, viewValue: 'NO'},
    { value: true, viewValue: 'YES'},
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userservice: UserService,
  ) {
    this.createForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      is_staff: new FormControl(false, [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {

  }

  /**
   * [username description]
   */
  get username() {
    return this.createForm.get('username');
  }

  /**
   * [first_name description]
   */
  get first_name() {
    return this.createForm.get('first_name');
  }

  /**
   * [last_name description]
   */
  get last_name() {
    return this.createForm.get('last_name');
  }

  /**
   * [is_staff description]
   */
  get is_staff() {
    return this.createForm.get('is_staff');
  }

  /**
   * [email description]
   */
  get email() {
    return this.createForm.get('email');
  }

  /**
   * [password description]
   */
  get password() {
    return this.createForm.get('password');
  }

  /**
   * [onSubmit description]
   */
  onSubmit(): void {
    // Process checkout data here
    console.log(this.createForm.value);
    this.userservice.createUser(
      this.createForm.value
    ).subscribe((value: IDjangoUser) => {
      console.log(value);
      this.createForm.reset();
      this.router.navigate(['/chat/users']);
    });
  }

}
