import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, of, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

declare var require: any;
let repositories = require('../../assets/data/repositories.json');

@Injectable()
export class RepositoryService {

  url: string;
  repositoryID: string;
  private selectedRepositorySource: any = new BehaviorSubject({});
  selectedRepository = this.selectedRepositorySource.asObservable();

  private repositoryInfoSource: any = new BehaviorSubject({message: 'default'});
  repositoryInfo = this.repositoryInfoSource.asObservable();

  constructor(private http: HttpClient) {
    this.url = 'https://api.github.com/repositories/';
  }

  setSelectedRepository(repository) {
    this.getRepositoryInfo(repository.ID).subscribe(data => {
      this.repositoryInfo = this.repositoryInfoSource.next(data);
    });
    this.selectedRepositorySource.next(repository);
  }

  // async getRepositoryInfo(repositoryID) {
  //   this.repositoryID = repositoryID;
  //   const request = await fetch(`${this.url}${repositoryID}`);
  //   return await request.json();
  // }

  getRepositoryInfo(repositoryID):Observable<any> {
    return this.http.get(`${this.url}${repositoryID}`);
  }

  search_word(term = null) {
    if (term) {
      let items = repositories.filter(rep => rep.Repository.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
      return of(items);
    }
    else return [];
  }

  async retrieveRepositoryFromJson(id){
      return await repositories.filter(rep => {
        // console.log(rep.ID, id)
        return rep.ID.toString() === id
      })
  }



}
