import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { common } from '../../common';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [common.listStagger]
})
export class UsersComponent implements OnInit {

  users$: Object;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getUsers().subscribe(data => this.users$ = data);
  }

}
