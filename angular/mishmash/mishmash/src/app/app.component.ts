import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <label for="name">Name: </label>
      <input type="text" id="name" #name />&nbsp;
      <button (click)="submit(name)">Submit</button>
    </div>
  `,
  styleUrls: []
})


export class AppComponent {
   name: string;

   submit(name: HTMLInputElement): boolean {
     alert(`Submitted: ${name.value}`);
     return true;
   }
}
