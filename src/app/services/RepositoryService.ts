import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {BehaviorSubject, of} from "rxjs";

declare var require: any;
let repositories = require('../../assets/data/repositories.json');

@Injectable()
export class RepositoryService {

  url: string;
  private selectedRepositorySource: any = new BehaviorSubject({});
  selectedRepository = this.selectedRepositorySource.asObservable();

  private repositoryInfoSource: any = new BehaviorSubject({message: 'default'});
  repositoryInfo = this.repositoryInfoSource.asObservable();

  constructor(private http: Http) {
    this.url = 'https://api.github.com/repositories/';
  }

  setSelectedRepository(repository) {
    this.getRepositoryInfo(repository.ID).then(data => {
      this.repositoryInfo = this.repositoryInfoSource.next(data);
    });
    this.selectedRepositorySource.next(repository);
  }

  async getRepositoryInfo(repositoryID){
    const request = await fetch(`${this.url}${repositoryID}`);
    return await request.json();
  }

  getRepInfo() {
    return this.repositoryInfo;
  }

  search_word(term = null) {
    if (term) {
      let items = repositories.filter(rep => rep.Projects.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
      return of(items);
    }
    else return [];
  }
}
