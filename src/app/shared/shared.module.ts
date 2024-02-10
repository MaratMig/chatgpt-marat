import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TransformElementDirective } from './directives/transform-element.directive';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { InputPanelComponent } from './components/input-panel/input-panel.component';

const declarations = [TransformElementDirective, InputPanelComponent]
const imports = [CommonModule, FormsModule, ReactiveFormsModule, AngularMaterialModule]

@NgModule({
  declarations: [...declarations],
  imports: [...imports],
  exports: [...declarations, ...imports]
})
export class SharedModule {}
