import { Component, OnInit } from '@angular/core';
import {RepositoryService} from "../../services/RepositoryService";

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css'],
})
export class RepositoryComponent implements OnInit {

  constructor(private repositoryService: RepositoryService) { }
  repositoryMetrics: any;
  repositoryInfo: any;
  ngOnInit() {
    this.repositoryService.selectedRepository.subscribe(repository => this.repositoryMetrics = repository );
    this.repositoryService.repositoryInfo.subscribe(repository => {
      this.repositoryInfo = repository;
    });
  }

}
