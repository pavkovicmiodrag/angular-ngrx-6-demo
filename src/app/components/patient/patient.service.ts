import {Injectable, Inject} from '@angular/core';
import  {Http, Headers, URLSearchParams, RequestOptions, Response} from '@angular/http';
import {List} from 'immutable';
import { of } from 'rxjs/observable/of';
import { switchMap } from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {IPatient} from './Patient.model';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  // We declare that this service should be created by the root application inhector.
  providedIn: 'root',
})
export class PatientService {

    http: HttpClient;
    baseUrl: string;

    // Observable selectedPatient source
    private _selectedPatientSource = new BehaviorSubject<IPatient>(null);
    // Observable selectedPatient stream
    selectedPatient$ = this._selectedPatientSource.asObservable();

    constructor(http: HttpClient)  {
        this.http = http;
        this.baseUrl = 'http://localhost:8080/api/patients/';
    }

  // service command
  selectPatient(selectedPatient: IPatient) {
    this._selectedPatientSource.next(selectedPatient);
  }
  getSelectedPatient() {
      return this.selectedPatient$;
  }

    findPatients(): Observable<IPatient[]> {
      console.log('findPatients');
      // ...using get request
      return this.http.get(this.baseUrl)
        .map(data => data['content']);
          // ...and calling .json() on the response to return data
          // .map((res: Response) => <any[]>res.json())
          // ...errors if any
       //   .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

    }
    createPatient(newPatient: IPatient): Observable<IPatient> {
        return this.http
          .post<IPatient>(this.baseUrl, newPatient);

          // .pipe(catchError((error: any) => Observable.throw(error)));
    }
    deletePatient(deletePatient: IPatient): Observable<IPatient> {
      console.log('deletePatient', deletePatient.id);
        return this.http.delete<IPatient>(this.baseUrl + deletePatient.id)
          .pipe(
            switchMap(() => of(deletePatient))
          );
    }

    handleError(error: any) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }


}
