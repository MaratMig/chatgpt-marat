import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const modules = [MatSidenavModule, MatButtonModule, MatIconModule];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class AngularMaterialModule {}
