import {Injectable, Inject} from '@angular/core';
import  {Http, Headers, URLSearchParams, RequestOptions, Response} from '@angular/http';
import {List} from 'immutable';
import { of } from 'rxjs/observable/of';
import { switchMap } from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {Diagnose, IDiagnose} from './diagnose.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  // We declare that this service should be created by the root application inhector.
  providedIn: 'root',
})
export class DiagnoseService {

    http: HttpClient;
    baseUrl: string;
    constructor(http: HttpClient)  {
        this.http = http;
        this.baseUrl = 'http://localhost:8080/api/diagnoses/';
    }


    findDiagnoses(): Observable<IDiagnose[]> {
      console.log('findDiagnoses');
      // ...using get request
      return this.http.get(this.baseUrl)
        .map(data => data['content']);
          // ...and calling .json() on the response to return data
          // .map((res: Response) => <any[]>res.json())
          // ...errors if any
       //   .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

    }
    createDiagnose(newDiagnose: IDiagnose): Observable<IDiagnose> {
        return this.http
          .post<IDiagnose>(this.baseUrl, newDiagnose);
          // .pipe(catchError((error: any) => Observable.throw(error)));
      }

//     saveDiagnose(newDiagnose: Diagnose): Observable<Response> {
//         const body = JSON.stringify( newDiagnose );
//         const headers = new Headers({ 'Content-Type': 'application/json' });
//         const options = new RequestOptions({ headers: headers });
//         return this.http.post((this.baseUrl), body, options);
//     }
//
//     updateDiagnose (diagnose: IDiagnose) : Observable<Response>  {
// //
//       const body = JSON.stringify( diagnose )
//       const headers = new Headers({ 'Content-Type': 'application/json' });
//       const options = new RequestOptions({ headers: headers });
//
//         return this.http.put((this.baseUrl + diagnose.id), body, options)
//                          .share();
//     }
// //
//
    deleteDiagnose(deleteDiagnose: IDiagnose): Observable<IDiagnose> {
      console.log('deleteDiagnose', deleteDiagnose.id);
        return this.http.delete<IDiagnose>(this.baseUrl + deleteDiagnose.id)
          .pipe(
            switchMap(() => of(deleteDiagnose))
          );
    }

    handleError(error: any) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }


}
