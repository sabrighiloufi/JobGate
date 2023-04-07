import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchnamecontract'
})
export class SearchnamecontractPipe implements PipeTransform {

  transform(value: any, term: any) {
    if(term==null){
      return value;
    }else{
      return value.filter((item:any)=>(item.name.includes(term)))
    }
  }

}
