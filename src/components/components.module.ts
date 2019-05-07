import { NgModule } from '@angular/core';
import { HeaderMenuComponent } from './header-menu/header-menu';
import { HeaderMenuSairComponent } from './header-menu-sair/header-menu-sair';
@NgModule({
	declarations: [HeaderMenuComponent,
    HeaderMenuSairComponent],
	imports: [],
	exports: [HeaderMenuComponent,
    HeaderMenuSairComponent]
})
export class ComponentsModule {}
