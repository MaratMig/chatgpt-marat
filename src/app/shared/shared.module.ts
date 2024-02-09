import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TransformElementDirective } from './directives/transform-element.directive';
import { AngularMaterialModule } from './angular-material/angular-material.module';

const declarations = [TransformElementDirective]
const imports = [CommonModule, FormsModule, AngularMaterialModule]

@NgModule({
  declarations: [...declarations],
  imports: [...imports],
  exports: [...declarations, ...imports]
})
export class SharedModule {}
