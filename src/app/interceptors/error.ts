import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { catchError, of, tap } from "rxjs";

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    return next(req).pipe(
        tap(() => console.log(req)),
        catchError((err) => {
            console.log(err)
            return of(err);
        })
    )
}