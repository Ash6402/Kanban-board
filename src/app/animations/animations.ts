import { animate, animateChild, query, style, transition, trigger } from "@angular/animations";

export const routerAnimation = 
trigger('animation', [
    transition('*<=>*', [
        query(':enter', [
            style({
                opacity: 0,
            }), 
            animate('80ms',style({ opacity: 1}))
        ], {optional: true}),
    ])
])

export const slideAnimation = 
trigger('slide', [
    transition(':enter', [
        style({height: 0, padding: 0, overflow: 'hidden'}),
        animate('100ms ease-in', style({height: '*', padding: '*'})) 
    ])        
])