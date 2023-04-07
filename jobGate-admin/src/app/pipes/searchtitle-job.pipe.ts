import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchtitleJob'
})
export class SearchtitleJobPipe implements PipeTransform {

  transform(value: any, term: any) {
    if(term==null){
      return value;
    }else{
      return value.filter((item:any)=>(item.company.fullname.includes(term)) || (item.title.includes(term) ))
    }
  }
}
