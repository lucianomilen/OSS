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
  chartData: any;
  ngOnInit() {
    this.repositoryService.selectedRepository.subscribe(repository => {
      this.repositoryMetrics = repository;
      this.chartData = Object.keys(repository).map(function(key) {
      return repository[key];
    });

      this.chartData.splice(0, 2);

      if (!repository.ID) {
        this.router.navigate([`/`]);
        // this.repositoryMetrics.ID = this.activatedRoute.snapshot.params.id;
      }
    });
    this.repositoryService.getRepositoryInfo(this.repositoryMetrics.ID).then(repository => {
      this.repositoryInfo = repository;
    });
  }

  public lineChartData: Array<any> = [
    {data: [0], label: 'LMA'},
  ];
  public lineChartLabels: Array<any> = ['LMA0', 'LMA1', 'LMA2', 'LMA3'];
  public lineChartOptions: any = {
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
  
  public lineChartLegend = true;
  public lineChartType = 'line';

  public randomize(): void {
    console.log(this.chartData);
    this.lineChartData = this.chartData;
  }

  // events

}
