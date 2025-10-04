import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export class HttpRequestHandler implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    if (localStorage.getItem('Access-Token') === null) {
      request = request.clone({
        headers: request.headers
          .append('Accept', 'application/json')
          .append('Access-Control-Allow-Origin', '*')
          .append('Access-Control-Allow-Methods', 'GET,POST')
        // .append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
        // .append('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTION')
      });
    }
    else {
      const accessToken = 'Bearer ' + localStorage.getItem('Access-Token');
      request = request.clone({
        headers: request.headers
          .append('Accept', 'application/json')
          .append('Access-Control-Allow-Origin', '*')
          // .append('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTION')
          .append('Access-Control-Allow-Methods', 'GET,POST,PUT')
          .append('Authorization', accessToken)
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Http Error => ', error);
        throw (error);
      })
    );

  }
}
