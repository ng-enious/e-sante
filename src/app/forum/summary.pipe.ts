/**
 * Created by Sofiane on 26/04/2017.
 */
import { Pipe,PipeTransform} from '@angular/core';

@Pipe({
  name: 'summary'
})
export class SummaryPipe implements PipeTransform{
  transform(value: string, args: string[]) {
    var limit = (args && args[0]) ? parseInt(args[0]):50;
    if(value)
      return value.substring(0,limit)+'...';
  }

}
