import { Pipe, PipeTransform } from "@angular/core";
import { NguxPagination } from "../pagination";

export type PaginationCollection<T> = T[] | ReadonlyArray<T>;

@Pipe({
  name: 'ngux-pagination',
  pure: false
})
export class NguxPaginationPipe implements PipeTransform {
  constructor() { }

  public transform(collection: any[], pagination: NguxPagination): any[] {

    pagination.totalRows = collection.length

    // Reset to last page if out of bounds
    if (pagination.currentPage * pagination.pageSize > pagination.totalRows) [
      pagination.currentPage = Math.ceil(pagination.totalRows / pagination.pageSize) - 2
    ]

    // Get slice start and end
    const sliceStart = pagination.currentPage * pagination.pageSize;
    const sliceEnd = sliceStart + pagination.pageSize;

    let filteredCollection = collection.slice(sliceStart, sliceEnd)
    return filteredCollection;
  }
}
