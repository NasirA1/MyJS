import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';


export const common = {
  listStagger:
    trigger('listStagger', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-25px)' }),
          stagger('100ms',
            animate('500ms ease-out',
              style({ opacity: 1, transform: 'translateY(0px)' })
            )
          )
        ], { optional: true }),
        query(':leave', animate('50ms', style({ opacity: 0 })), { optional: true })
      ])
    ]) //end-of-listStagger
};
