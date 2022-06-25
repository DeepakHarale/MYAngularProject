import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupService } from './setup.service';
import { NavigationService } from '@app/modules/navigation/services';
@NgModule({
    imports: [CommonModule],
})
export class CommonServiceModule {
    constructor(@Optional() @SkipSelf() parentModule: CommonServiceModule) {
        throwIfAlreadyLoaded(parentModule, 'CommonServiceModule');
    }
    static forRoot() { //  forRoot(config: UserServiceConfig)
        return {
            ngModule: CommonServiceModule,
            providers: [
                SetupService, NavigationService
            ]
        };
    }
}
export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
    if (parentModule) {
        throw new Error(`${moduleName} has already been loaded. Import Core modules in the AppModule only.`);
    }
}

