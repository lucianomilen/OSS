import { Component } from '@angular/core';
import {RepositoryService} from "./services/RepositoryService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [RepositoryService]
})
export class AppComponent {
  title = 'OSS';
}
