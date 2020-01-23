import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-core-header',
  templateUrl: './core-header.component.html',
  styleUrls: ['./core-header.component.scss'],
})
export class CoreHeaderComponent implements OnInit {

  @Input() title: string;

  constructor() { }

  ngOnInit() {}

}
