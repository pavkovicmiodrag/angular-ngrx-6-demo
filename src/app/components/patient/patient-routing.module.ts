import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientComponent } from './patient.component';

const routes: Routes = [
    {
        path: '',
        component: PatientComponent,
        // children: [
        //     { path: '', component: PatientListComponent },
        //     { path: 'form', component: PatientFormComponent },
        //     {
        //         path: ':id', component: PatientDetailComponent,
        //         children: [
        //             { path: 'personal', component: PatientDetailPersonalComponent },
        //             { path: 'contact', component: PatientDetailContactComponent },
        //             { path: 'gallery', component: PatientDetailGalleryComponent },
        //             { path: 'health', component: PatientDetailHealthComponent },
        //             { path: ':owner/treatments', loadChildren: 'app/components/treatment/treatment.module#TreatmentModule' }
        //         ]
        //     }
        // ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PatientRoutingModule { }
