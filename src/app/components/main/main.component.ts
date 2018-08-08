import { Component } from '@angular/core';
import {SearchbarComponent} from "../searchbar/searchbar.component";

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  title:string = 'OSS';
}
