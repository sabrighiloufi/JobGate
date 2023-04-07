import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchjobs'
})
export class SearchjobsPipe implements PipeTransform {

  transform(value: any, term: any) {
    if(term==null){
      return value;
    }else{
      return value.filter((item:any)=>(item.title.includes(term)) || (item.location.city.includes(term)) || (item.speciality.name.includes(term)))
    }
  }

}
