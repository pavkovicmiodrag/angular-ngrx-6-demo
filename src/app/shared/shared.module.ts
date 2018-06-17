/*
 * SharedModule exists to hold the common modules, components, directives,
 * and pipes and share them with the modules that need them.
 *
 * @ngModule SharedModule class to own the shared material.
 */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatAutocompleteModule, MatButtonModule, MatCheckboxModule, MatCommonModule, MatDialogModule, MatMenuModule,
  MatIconModule, MatInputModule, MatOptionModule, MatSelectModule, MatButtonToggleModule, MatCardModule, MatChipsModule,
  MatExpansionModule, MatGridListModule, MatDatepickerModule, MatListModule, MatNativeDateModule, MatPaginatorModule,
  MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatTooltipModule, MatSidenavModule,
  MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule,
  MatToolbarModule,
  MatFormFieldModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {ThemeStore} from "./services/theme-store";
import {CapitalizePipe} from "./pipes/capitalize.pipe";
import {ValuesPipe} from "./pipes/values.pipe";
import {TrimPipe} from "./pipes/trim.pipe";
import {ListToDict} from "./pipes/listtodict.pipe";
import {CustomSlice} from "./pipes/slice.pipe";
import {SortByDirective} from "./directives/sortby.directive";
import {
  DeleteConfirmDialogComponent
} from "./delete-confirm-dialog/delete-confirm-dialog.component";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  entryComponents: [
    DeleteConfirmDialogComponent,
  ],
    imports: [
      CommonModule,
      MatButtonModule,
      MatDialogModule,
      MatIconModule,
      MatInputModule,
      MatSelectModule,
      FlexLayoutModule,
      ],
    declarations: [ValuesPipe, CapitalizePipe, TrimPipe, CustomSlice, ListToDict, SortByDirective, DeleteConfirmDialogComponent],
    exports: [
      CommonModule,
      RouterModule,
      FormsModule,
      ReactiveFormsModule,
      MatAutocompleteModule,
      MatButtonModule,
      MatButtonToggleModule,
      MatCardModule,
      MatCheckboxModule,
      MatChipsModule,
      MatCommonModule,
      MatDatepickerModule,
      MatDialogModule,
      MatExpansionModule,
      MatFormFieldModule,
      MatGridListModule,
      MatIconModule,
      MatInputModule,
      MatListModule,
      MatMenuModule,
      MatNativeDateModule,
      MatOptionModule,
      MatPaginatorModule,
      MatProgressBarModule,
      MatProgressSpinnerModule,
      MatRadioModule,
      MatRippleModule,
      MatSelectModule,
      MatSidenavModule,
      MatSliderModule,
      MatSlideToggleModule,
      MatSnackBarModule,
      MatSortModule,
      MatTableModule,
      MatTabsModule,
      MatToolbarModule,
      MatTooltipModule,
      ValuesPipe,
      CapitalizePipe,
      TrimPipe,
      CustomSlice,
      ListToDict,
      SortByDirective,
      FlexLayoutModule
    ],
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ThemeStore],
    };
  }
}
