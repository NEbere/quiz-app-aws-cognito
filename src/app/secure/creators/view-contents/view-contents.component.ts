import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Content, ContentService } from '../content.service'
import { Callback, CognitoUtil } from "../../../service/cognito.service";
import { UserParametersService } from "../../../service/user-parameters.service";

@Component({
  selector: 'app-view-contents',
  templateUrl: './view-contents.component.html',
  styleUrls: ['./view-content.component.css']
})
export class ViewContentsComponent implements OnInit {
  contents: Content;
  selectedContent: any;
  public parameters: Array<any> = []
  loading: boolean

  constructor(
    private contentService: ContentService,
    private router: Router,
    public cognitoUtil: CognitoUtil,
    public userParametersService: UserParametersService
  ) { }

  ngOnInit(): void {
    this.getContents();
  }
  getContents(): void {
    this.loading = true
    this.contentService
      .getContents()
      .then(response => {
        this.contents = response.items
        this.loading = false
      })
      .catch(error => {
        console.log(error, 'Error getting contents')
        return error
      })
  }

  gotoDetail(content: any): void {
    this.selectedContent = content;
    this.router.navigate(['securehome/detail', this.selectedContent.id]);
  }

  goToCreatePage(): void {
    this.router.navigate(['securehome/create-content']);
  }

}

