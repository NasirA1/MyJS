import { Component, Directive, Input, OnInit, TemplateRef, ViewChild,
  ElementRef, AfterContentInit, ContentChild, AfterViewInit, ViewChildren,
  QueryList, AfterViewChecked, ChangeDetectionStrategy } from '@angular/core';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';



//////////////////////////////////////////  Models ////////////////////////////////////////////

export class QuestionBase<T> {
  value: T;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;

  constructor(options: {
      value?: T,
      key?: string,
      label?: string,
      required?: boolean,
      order?: number,
      controlType?: string } = {})
  {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
  }
}

export class TextboxQuestion extends QuestionBase<string> {
  controlType = 'textbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}


export class NumberQuestion extends QuestionBase<number> {
  controlType = 'number';
  type: number;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}


export class DropdownQuestion extends QuestionBase<string> {
  controlType = 'dropdown';
  options: {key: string, value: string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}




//////////////////////////////////////////  Services  ////////////////////////////////////////////

@Injectable()
export class QuestionControlService {
  constructor() { }

  toFormGroup(questions: QuestionBase<any>[] ) {
    let group: any = {};

    questions.forEach(question => {
      group[question.key] = question.required
        ? new FormControl(question.value || '', Validators.required)
        : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }
}


@Injectable()
export class QuestionService {
  getQuestions() {
    let questions: QuestionBase<any>[] = [

      new DropdownQuestion({
        key: 'brave',
        label: 'Bravery Rating',
        options: [
          {key: 'solid',  value: 'Solid'},
          {key: 'great',  value: 'Great'},
          {key: 'good',   value: 'Good'},
          {key: 'unproven', value: 'Unproven'}
        ],
        order: 3
      }),

      new TextboxQuestion({
        key: 'firstName',
        label: 'First name',
        value: 'Bombasto',
        required: true,
        order: 1
      }),

      new NumberQuestion({
        key: 'age',
        label: 'Age',
        value: 30,
        order: 4
      }),

      new TextboxQuestion({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2
      })
    ];

    return questions.sort((a, b) => a.order - b.order);
  }
}




////////////////////////////////////////// app-question ////////////////////////////////////////////

@Component({
  selector: 'app-question',
  template: `<div [formGroup]="form">
  <label [attr.for]="question.key">{{question.label}}</label>
  <div [ngSwitch]="question.controlType">
    <input *ngSwitchCase="'textbox'" [formControlName]="question.key"
            [id]="question.key" [type]="question.type">
    <input *ngSwitchCase="'number'" [formControlName]="question.key"
            [id]="question.key" [type]="'number'">
    <select [id]="question.key" *ngSwitchCase="'dropdown'" [formControlName]="question.key">
      <option *ngFor="let opt of question.options" [value]="opt.key">{{opt.value}}</option>
    </select>
  </div>
  <div class="errorMessage" *ngIf="!isValid">{{question.label}} is required</div>
</div>`
})
export class DynamicFormQuestionComponent {
  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.question.key].valid; }
}




////////////////////////////////////////// app-dynamic-form  ////////////////////////////////////////////

@Component({
  selector: 'app-dynamic-form',
  template: `<div>
  <form (ngSubmit)="onSubmit()" [formGroup]="form">
    <div *ngFor="let question of questions" class="form-row">
      <app-question [question]="question" [form]="form"></app-question>
    </div>
    <div class="form-row">
      <button type="submit" [disabled]="!form.valid">Save</button>
    </div>
  </form>
  <div *ngIf="payLoad" class="form-row">
    <strong>Saved the following values</strong><br>{{payLoad}}
  </div><br/>
</div>`,
  providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit {

  @Input() questions: QuestionBase<any>[] = [];
  form: FormGroup;
  payLoad = '';

  constructor(private qcs: QuestionControlService) {}

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }
}



@Directive({selector: 'child-directive'})
export class ChildDirective {
}






@Component({
  selector: 'inline-editable-any',
  template: `
    <div style="border: 1px solid black; padding: 1em; margin: 1em;">
      <ng-container *ngTemplateOutlet="contentTemplate">
      </ng-container>
      <button (click)="pencilClick()">Pencil</button>
      <button (click)="cancelClick()">Cancel</button>
      <button (click)="okClick()">OK</button>
    </div>`
})
export class InlineEditableAny implements  AfterViewChecked, AfterViewInit {
  @Input() contentTemplate: TemplateRef<any>;
  @Input() contentElement: ElementRef;

  private pencilClick() { alert('pencil was clicked!'); }
  private cancelClick() { alert('cancel was clicked!'); }
  private okClick() { alert('ok was clicked!'); }

  constructor() {
  }

  ngAfterViewInit() {
    if(this.contentElement) {
      console.log('InlineEditableAny.contentElement => ', this.contentElement);
      this.contentElement.nativeElement.readOnly = true;
    }
  }

  ngAfterViewChecked() {
    if(this.contentElement) {
      console.log('InlineEditableAny.contentElement => ', this.contentElement);
      this.contentElement.nativeElement.readOnly = true;
    }
  }
}



////////////////////////////////////////// app-root ////////////////////////////////////////////

@Component({
  selector: 'app-root',
  /*template: `
    <div>
      <h2>Job Application for Heroes</h2>
      <app-dynamic-form [questions]="questions"></app-dynamic-form>
    </div>
  `,*/
  template: `
    <ng-template #myInlineEditableContentTemplate>
      <input type="text" #myInlineEditableContent />
    </ng-template>
    <inline-editable-any [contentTemplate]="myInlineEditableContentTemplate" [contentElement]='myInlineEditableContent'>
    </inline-editable-any>
  `,
  providers:  [QuestionService]
})
export class AppComponent  {
  @ViewChild('myInlineEditableContent') myInlineEditableContent;


}
