import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RepositoryService} from '../../services/RepositoryService';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss'],
})
export class RepositoryComponent implements OnInit {

  constructor(private repositoryService: RepositoryService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  repositoryMetrics: any;
  repositoryInfo: any;
  lmaData: any;

  public repInfoChartData: Array<any>;
  lmaChartData = [];

  public lmaChartLabels: Array<any> = ['LMA0', 'LMA1', 'LMA2', 'LMA3'];
  public lmaChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          max: 100
        }
      }]
    }
  };

  public repInfoChartLabels: Array<any> = ['8p', '7p', '6p', '5p', '4p', '3p', '2p', '1p'];
  public repInfoChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          max: 100
        }
      }]
    }
  };

  dataReady = false;
  commitsData = [];
  forksData = [];
  issuesData = [];
  pullsData = [];


  ngOnInit() {
    this.repositoryService.selectedRepository.subscribe(repository => {
      this.repositoryMetrics = repository;

      console.log(this.repositoryMetrics);

      for (let i = 1; i <= 8; i++) {
          this.commitsData.push(this.repositoryMetrics[`Commits_${i}`]);
          this.forksData.push(this.repositoryMetrics[`Forks_${i}`]);
          this.issuesData.push(this.repositoryMetrics[`Issues_${i}`]);
          this.pullsData.push(this.repositoryMetrics[`Pulls_${i}`]);
      }

      // console.log(this.commitsData, this.forksData, this.issuesData, this.pullsData)

      this.lmaData = Object.keys(repository).map(function (key) {
        return repository[key];
      });

      this.lmaData.splice(0, 2);

      this.repInfoChartData = [
        {data: this.forksData, label: 'forks'},
        {data: this.commitsData, label: 'commits'},
        {data: this.issuesData, label: 'issues'},
        {data: this.pullsData, label: 'pulls'},
      ];

      this.lmaChartData = [
        {data: this.lmaData, label: 'LMA'},
      ];


      if (!repository.ID) {
        // this.router.navigate([`/`]);
        const tmpRep = {
          ID: this.activatedRoute.snapshot.params.id
        }
        this.repositoryService.setSelectedRepository(tmpRep)
        // this.repositoryMetrics.ID = this.activatedRoute.snapshot.params.id;
      }

      else {
        this.dataReady = true;
      }
    });
    this.repositoryService.getRepositoryInfo(this.repositoryMetrics.ID).then(repository => {
      this.repositoryInfo = repository;
    });
  }

}
