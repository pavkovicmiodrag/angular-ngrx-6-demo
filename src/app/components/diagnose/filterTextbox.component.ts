import { Component, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'filter-textbox',
  template: `<mat-form-field>
                        <input matInput  placeholder="Filter diagnose" align="end"  [(ngModel)]="model.filter" 
                (keyup)="filterChanged($event)" ngDefaultControl>
                    </mat-form-field>`
})
export class FilterTextboxComponent {


    model: { filter: string } = { filter: null };

    @Output()
    changed: EventEmitter<any> = new EventEmitter();

    filterChanged(event: any) {
        event.preventDefault();
        this.changed.emit(this.model.filter); //Raise changed event
    }
}
