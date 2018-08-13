import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

declare var require: any;
let repositories = require('../../assets/data/repositories.json');

@Injectable()
export class RepositoryService {

  url: string

  constructor(private http: Http) {
    this.url = 'https://api.github.com/search/repositories?q=';
  }

  // getRepositoryInfo(repositoryName){
  //   return this.http.get(this.url + repositoryName).pipe(map(res => {
  //     let result = res.json();
  //     return result.items.map(item => {
  //       return item.full_name
  //     })
  //   }))
  // }

  search_word(term) {
    if (term) {
      let temp = repositories.map(item => item.Repository);
      return (temp.filter(it => {
        return it.toLowerCase().includes((term));
      }));
    }
    else return [];
    // return this.http.get(this.url + term).pipe(map(res => {
    //   let result = res.json();
    //   return result.items.map(item => {
    //     return item.full_name
    //   })
    // }))

  }
}
