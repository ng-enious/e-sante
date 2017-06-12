/**
 * Created by Sofiane on 21/04/2017.
 */
//our root app component
import {Component, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { Pipe,PipeTransform} from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilter implements PipeTransform {
  transform(items: any[], criteria: any): any {

    return items.filter(item =>{
      for (let key in item ) {
        if((""+item[key]).includes(criteria)){
          return true;
        }
      }
      return false;
    });
  }
}
