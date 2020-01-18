import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { UserService, IDjangoUser } from 'src/app/user/services';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    // 'username',
    'email',
    'is_staff',
    'action'
  ];

  dataSource: IDjangoUser[] = [];

  constructor(
    private userservice: UserService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.userservice.getUsers().subscribe((response) => {
      // console.log(response);
      this.dataSource = response;
    });

  }

  /**
   * [createUser description]
   */
  createUser(): void {
    this.router.navigate(['/app/users/create/']);
  }

  /**
   * [editUser description]
   */
  editUser(userid: number): void {
    this.router.navigate([
      '/app/users/user/',
      userid
    ]);
  }

  /**
   * [deleteUser description]
   */
  deleteUser(id: number, index: number) {
    this.userservice.deleteUser(id).subscribe((response) => {
      // this.dataSource.splice(index, 1);
      this.dataSource = this.dataSource.filter((u: IDjangoUser, i: number) => {
        if (i !== index) {
          return u;
        }
      });
    });
  }

}
