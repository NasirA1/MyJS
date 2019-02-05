import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { common } from '../../common';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  animations: [common.listStagger]
})
export class PostsComponent implements OnInit {

  posts$: Object;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getPosts().subscribe(data => this.posts$ = data );
  }

}
