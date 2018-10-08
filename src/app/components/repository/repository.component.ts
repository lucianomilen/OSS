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

  public lmaChartLabels: Array<any> = ['LMA3', 'LMA2', 'LMA1', 'LMA0'];
  public lmaChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          max: 100
        },
        scaleLabel: {
          display: true,
          labelString: 'Grade'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Grade'
        }
      }]
    }
  };

  public repInfoChartLabels: Array<any> = ['24m', '21m', '18m', '15m', '12m', '9m', '6m', '3m'];
  public repInfoChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Count'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Months ago'
        }
      }]
    }
  };

  dataReady = false;
  commitsData = [];
  forksData = [];
  issuesData = [];
  pullsData = [];

  getRepositoryData(repository) {
    for (let i = 1; i <= 8; i++) {
      this.commitsData.push(this.repositoryMetrics[`Commits_${i}`]);
      this.forksData.push(this.repositoryMetrics[`Forks_${i}`]);
      this.issuesData.push(this.repositoryMetrics[`Issues_${i}`]);
      this.pullsData.push(this.repositoryMetrics[`Pulls_${i}`]);
    }
    if (repository) {
      this.lmaData = Object.keys(repository).map( key => {
        return repository[key];
      });

      this.lmaData.splice(0, 2);
      this.lmaData.splice(4, this.lmaData.length);

      this.repInfoChartData = [
        {data: this.forksData, label: 'forks'},
        {data: this.commitsData, label: 'commits'},
        {data: this.issuesData, label: 'issues'},
        {data: this.pullsData, label: 'pulls'},
      ];

      this.lmaChartData = [
        {data: this.lmaData.reverse(), label: 'LMA'},
      ];
    }
  }

  ngOnInit() {
    this.repositoryService.selectedRepository.subscribe(repository => {
      this.repositoryMetrics = repository;
      this.getRepositoryData(repository);

      if (!repository.ID) {
        this.repositoryService.retrieveRepositoryFromJson(this.activatedRoute.snapshot.params.id).then(
          repository => {
            this.repositoryService.setSelectedRepository(repository[0]);
            this.getRepositoryData(repository[0]);
          }
        );
        // this.repositoryMetrics.ID = this.activatedRoute.snapshot.params.id;
      }

      else {
        this.dataReady = true;
      }
    });
    this.repositoryService.getRepositoryInfo(this.repositoryMetrics.ID).subscribe(repository => {
      this.repositoryInfo = repository;
    });
  }

}
