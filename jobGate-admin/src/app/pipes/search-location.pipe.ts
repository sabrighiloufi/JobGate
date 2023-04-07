import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchLocation'
})
export class SearchLocationPipe implements PipeTransform {

  transform(value: any, term: any) {
    if(term==null){
      return value;
    }else{
      return value.filter((item:any)=>(item.address.includes(term))|| (item.city.includes(term) )|| (item.country.includes(term) ))
    }
  }

}
