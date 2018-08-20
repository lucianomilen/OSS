import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RepositoryService} from '../../services/RepositoryService';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css'],
})
export class RepositoryComponent implements OnInit {

  constructor(private repositoryService: RepositoryService, private activatedRoute: ActivatedRoute, private router: Router) { }
  repositoryMetrics: any;
  repositoryInfo: any;
  ngOnInit() {
    this.repositoryService.selectedRepository.subscribe(repository => {
      this.repositoryMetrics = repository;
      if (!repository.ID) {
        this.router.navigate([`/`]);
        // this.repositoryMetrics.ID = this.activatedRoute.snapshot.params.id;
      }
    });
    this.repositoryService.getRepositoryInfo(this.repositoryMetrics.ID).then(repository => {
      this.repositoryInfo = repository;
    });
  }

}
