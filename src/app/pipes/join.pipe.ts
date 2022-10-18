import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join',
})
export class JoinPipe implements PipeTransform {
  transform(value: string[]): unknown {
    if (value.length === 1) return value[0];
    const firsts = value.slice(0, value.length - 1);
    const last = value[value.length - 1];
    return firsts.join(', ') + ' y ' + last;
  }
}
