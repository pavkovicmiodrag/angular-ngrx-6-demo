import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DiagnoseComponent } from './diagnose.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: DiagnoseComponent }
  ])],
  exports: [RouterModule]
})
export class DiagnoseRoutingModule {}
