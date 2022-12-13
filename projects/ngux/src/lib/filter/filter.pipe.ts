import { Pipe, PipeTransform } from "@angular/core";
import { NguxFilter } from "./filter";

@Pipe({
  name: "filter",
  pure: false
})
export class NguxFilterPipe implements PipeTransform {

  transform(array: any[], filter: NguxFilter): any[] {

    return filter.filter(array)
  }
}
