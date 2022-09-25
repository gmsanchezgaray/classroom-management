import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initialLeters',
})
export class InitialLetersPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return value[0];
  }
}
