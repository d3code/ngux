import { NgModule } from '@angular/core';
import { NguxDropdownComponent } from './dropdown/dropdown.component';
import { NguxFilterPipe } from './filter/filter.pipe';
import { NguxPaginationControlsComponent } from './pagination/pagination-component/pagination.component';
import { NguxPaginationPipe } from './pagination/pagination-pipe/pagination.pipe';



@NgModule({
  declarations: [
    NguxDropdownComponent,

    NguxPaginationControlsComponent,
    NguxPaginationPipe,

    NguxFilterPipe
  ],
  imports: [
  ],
  exports: [
    NguxDropdownComponent,

    NguxPaginationControlsComponent,
    NguxPaginationPipe,

    NguxFilterPipe
  ]
})
export class NguxModule { }
