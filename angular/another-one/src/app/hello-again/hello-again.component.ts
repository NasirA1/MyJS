import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


export class Vegetable {
  name: string;
};

@Component({
  selector: 'app-hello-again',
  templateUrl: './hello-again.component.html',
  styleUrls: ['./hello-again.component.css']
})
export class HelloAgainComponent implements OnInit {

  @Input() xs: Vegetable[] = [
    { name: "tomatoes" },
    { name: "potatos" },
    { name: "onions" },
    { name: "garlic" },
    { name: "lettuce" }
  ];

  constructor() {}

  ngOnInit() {}

  clickHandler() {
    this.xs.forEach(x =>  console.log(x) );
  }

}
