
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {asObservable} from './asObservable';

@Injectable()
export class ThemeStore {
  // material theme, to store selected theme. Used just temporary for demo purpose.
  private _theme$: BehaviorSubject<string> = new BehaviorSubject('smiletime-theme');

  constructor() {
  }

  get theme() {
    return asObservable(this._theme$);
  }

  setTheme(theme) {
    this._theme$.next(theme);
  }
}
