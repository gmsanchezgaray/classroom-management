import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isAdmin',
})
export class IsAdminPipe implements PipeTransform {
  transform(value: boolean): string {
    return value
      ? '<span class="badge bg-success">Administrator</span>'
      : '<span class="badge bg-info">User</span>';
  }
}
