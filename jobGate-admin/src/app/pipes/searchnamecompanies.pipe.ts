import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchnamecompanies',
  pure: false
})
export class SearchnamecompaniesPipe implements PipeTransform {

  transform(value: any, term: any) {
    if(term==null){
      return value;
    }else{
      return value.filter((item:any)=>(item.fullname.includes(term)))
    }
  }

}
