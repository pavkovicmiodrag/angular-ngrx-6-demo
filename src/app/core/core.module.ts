/*
 * CoreModule class own the core material, collecting single-use classes and hiding their details inside a CoreModule.
 * A simplified root AppModule imports CoreModule in its capacity as orchestrator of the application as a whole and adds the providers to the AppModule providers.
 *
 * @ngModule CoreModule
 */
import { ModuleWithProviders, NgModule, Optional, SkipSelf }       from '@angular/core'
import { CommonModule }      from '@angular/common';
@NgModule({
    imports: [CommonModule]
})
export class CoreModule {

    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        /* Only the root AppModule should import the CoreModule. Bad things happen if a lazy-loaded module imports it. */
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule
        };
    }
}
