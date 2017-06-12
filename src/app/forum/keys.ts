/**
 * Created by Sofiane on 22/04/2017.
 */
import { Pipe,PipeTransform} from '@angular/core';
@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      keys.push({key: key, value: value[key]});
    }
    return keys;
  }
}
