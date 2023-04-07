import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchcompany'
})
export class SearchcompanyPipe implements PipeTransform {

  transform(value: any, term: any) {
    if(term==null){
      return value;
    }else{
      return value.filter((item:any)=>(item.fullname.includes(term)) || (item.address.includes(term)) )
    }
  }

}
