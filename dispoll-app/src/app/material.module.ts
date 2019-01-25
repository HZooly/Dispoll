import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatDividerModule],
  exports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatDividerModule],
})
export class MaterialModule { }