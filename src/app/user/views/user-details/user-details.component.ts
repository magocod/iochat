import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { UserService, IDjangoUser } from 'src/app/user/services';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  userDetails: IDjangoUser = {
    id: 0,
    username: '...',
    is_superuser: false,
    is_staff: false,
    email: '...@...',
    first_name: '...',
    last_name: '...',
    date_joined: '...',
    user_permissions: [],
  };
  // userData: any[];
  // userPermissions: any[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userservice: UserService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.userservice.getUser(
        parseInt(params.get('userId'), 10)
      ).subscribe((value: IDjangoUser) => {
        console.log(value);
        this.userDetails = value;
      });
    });
  }

}
