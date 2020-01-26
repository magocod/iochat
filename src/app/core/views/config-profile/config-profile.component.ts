import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-config-profile',
  templateUrl: './config-profile.component.html',
  styleUrls: ['./config-profile.component.scss'],
})
export class ConfigProfileComponent implements OnInit {

	title = 'Settings'

  constructor(
  	private router: Router,
  ) { }

  ngOnInit() {}

  /**
   * [redirect description]
   */
  redirect(): void {
  	this.router.navigate(['/app/profile']);
  }

}
