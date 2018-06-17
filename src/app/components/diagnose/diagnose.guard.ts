// import { Injectable } from '@angular/core';
// import { CanActivate } from '@angular/router';
//
// import { Store } from '@ngrx/store';
//
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/take';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/catch';
// import { of } from 'rxjs/observable/of';
//
// import { CoursesState, getCoursesState } from '../store/reducers/';
// import * as Courses from '../store/actions/courses.actions';
//
// @Injectable()
// export class CoursesGuard implements CanActivate {
//   constructor(private store: Store<CoursesState>) {}
//
//   getFromStoreOrAPI(): Observable<any> {
//     return this.store
//       .select(getCoursesState)
//       .do((data: any) => {
//         if (!data.courses.length) {
//           this.store.dispatch(new Courses.CoursesGet());
//         }
//       })
//       .filter((data: any) => data.courses.length)
//       .take(1);
//   }
//
//   canActivate(): Observable<boolean> {
//     return this.getFromStoreOrAPI()
//       .switchMap(() => of(true))
//       .catch(() => of(false));
//   }
// }
