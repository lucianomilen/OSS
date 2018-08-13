import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {debounceTime} from "rxjs/operators";
import {RepositoryService} from "../../services/RepositoryService";


@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
  providers: [RepositoryService]
})
export class SearchbarComponent implements OnInit {
  searchTerm: FormControl = new FormControl();

  searchResult = [];

  onRepositorySelection(repository) {
    // this.service.getRepositoryInfo(repository);
    console.log(repository);
  }

  constructor(private repositoryService: RepositoryService) {
    this.searchTerm.valueChanges.pipe(
      debounceTime(400))
      .subscribe(data => {
        // this.service.search_word(data).subscribe(response => {
        //   console.log(response)
        //   this.searchResult = response
        // })
        this.searchResult = this.repositoryService.search_word(data);
        // console.log(this.searchResult)
      })
  }

  ngOnInit(): void {
  }
}

