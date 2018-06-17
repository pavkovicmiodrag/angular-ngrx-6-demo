import {Component, OnDestroy, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Subscription} from 'rxjs/Subscription';
import {ThemeStore} from '../../shared/services/theme-store';

@Component({
  selector: 'app-sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.scss'],
  animations: [
    // Define the animation used on the containing dev where the width of the
    //  panel is determined. Here we define the expanded width to be 300px, and
    //  the collapsed width to be 60px.
    //
    // When expanding the panel we transition over a 50ms interval.
    //
    // When collapsing the panel we again use 50ms for the transition, but
    //  we add a delay of 50ms to allow some other animations to complete before
    //  shrinking the panel down.
    //
    trigger('panelWidthTrigger', [
      state('expanded', style({width: '330px'})),
      state('collapsed', style({width: '60px'})),
      transition('collapsed => expanded', animate('50ms ease-in')),
      transition('expanded => collapsed', animate('50ms 50ms ease-out'))
    ])
  ],
})
export class SidenavComponent implements OnInit, OnDestroy {
  state = 'collapsed';
  themeLogo = 'zhs-theme dark';
  header_title = 'SMILETIME DASHBOARD';
  themeSideNav = 'smiletime-theme dark';
  private themeSubscription: Subscription;
  links: any[];

  constructor(themeStore: ThemeStore) {
    this.themeSubscription = themeStore.theme.subscribe(theme => {
      this.themeLogo = theme.toString() + ' dark sidenav-header-logo';
      this.themeSideNav = theme.toString() + ' dark';
    });
  }

  ngOnInit(): void {
      this.links = [
        {
          name: 'Dashboard',
          icon: 'dashboard',
          url: '/dashboard'
        },
        {
          name: 'Patients',
          icon: 'person',
          url: '/patients'
        },
        {
          name: 'Doctors',
          icon: 'face',
          url: '/'
        },
        {
          name: 'Diagnoses',
          icon: 'note',
          url: '/diagnoses'
        },
        {
          name: 'Help',
          icon: 'help',
          url: '/help'
        },
      ];
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  toggleMove() {
    this.state = (this.state === 'collapsed' ? 'expanded' : 'collapsed');
  }
}
