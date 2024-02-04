import { animate, animateChild, query, style, transition, trigger } from "@angular/animations";

export const routerAnimation = 
    trigger('animation', [
        transition('*<=>*', [
            query(':enter', [
                style({
                    opacity: 0,
                }), 
                animate('100ms',style({ opacity: 1}))
            ], {optional: true}),
            query(':leave', [
                style({
                    opacity:1,
                }),
                animate('120ms', style({opacity: 0})),
            ])
        ])
    ])