import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { UserService, DjangoUser } from 'src/app/user/services';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  loading = false;

  displayedColumns: string[] = [
    'id',
    // 'username',
    'email',
    'is_staff',
    'action'
  ];

  // dataSource: IDjangoUser[] = [];

  constructor(
    public userservice: UserService,
    private router: Router,
  ) {

  }

  async ngOnInit() {
    try {
      this.loading = true;
      this.userservice.getUsers();
      // this.userservice.getUsers().subscribe((response) => {
      //   console.log(response);
      //   this.data = true;
      //   this.dataSource = response;
      // });
      this.loading = false;
    } catch (error) {
      this.loading = false;
    }
  }

  /**
   * [dataSource description]
   */
  get dataSource(): DjangoUser[] {
    return this.userservice.listUser();
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
      // this.dataSource = this.dataSource.filter((u: IDjangoUser, i: number) => {
      //   if (i !== index) {
      //     return u;
      //   }
      // });
      this.userservice.removeUser(id);
    });
  }

}
