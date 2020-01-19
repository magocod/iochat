import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { AlertController } from '@ionic/angular';

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
    private userservice: UserService,
    public alertController: AlertController
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

  /**
   * [deleteUser description]
   */
  deleteUser(id: number) {
    this.userservice.deleteUser(id).subscribe((response) => {
      console.log(response);
      this.userservice.removeUser(id);
      this.router.navigate(['/app/users/']);
    });
  }

  /**
   * [presentAlertConfirm description]
   */
  async presentAlertConfirm(id: number) {
    const alert = await this.alertController.create({
      header: 'Delete Confirm!',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.deleteUser(id);
          }
        }
      ]
    });

    await alert.present();
  }

}
