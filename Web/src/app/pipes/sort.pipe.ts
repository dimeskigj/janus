import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform<T>(array: T[], key?: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
    if (!Array.isArray(array)) return array;

    return array.sort((a, b) => {
      const aValue = key ? a[key] : a;
      const bValue = key ? b[key] : b;

      if (aValue < bValue) return order === 'asc' ? -1 : 1;
      if (aValue > bValue) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }
}
