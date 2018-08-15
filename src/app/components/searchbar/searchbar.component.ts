import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {catchError, debounceTime, distinctUntilChanged, switchMap, tap} from "rxjs/operators";
import {RepositoryService} from "../../services/RepositoryService";
import {concat, Observable, of, Subject} from "rxjs";
import {Router} from "@angular/router";


@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent implements OnInit {
  selectedRep: FormControl = new FormControl();
  searchResult: Observable<{} | any[]>;
  repositoriesInput = new Subject<string>();

  constructor(private repositoryService: RepositoryService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadRepositories();
  }

  onRepositorySelection(repository) {
    this.repositoryService.setSelectedRepository(repository);
    this.router.navigate(['/repository']);
  }

  loadRepositories() {
    this.searchResult = concat(
      of([]), // default items
      this.repositoriesInput.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(term => this.repositoryService.search_word(term)
        )
      )
    );
  }



}

