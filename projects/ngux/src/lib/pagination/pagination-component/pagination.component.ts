import { Component, Input } from '@angular/core'
import { NguxPagination } from '../pagination'

@Component({
  selector: 'ngux-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class NguxPaginationControlsComponent {
  constructor() {}
  
  @Input() pagination: NguxPagination = new NguxPagination();
}
