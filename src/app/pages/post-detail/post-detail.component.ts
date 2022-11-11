import { Component } from '@angular/core';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent {
  body: string = '';
  username: string = '';
  userFullName: string = '';
  id: number = 0;
  title: string = '';

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    let nav: Navigation | null = this.router.getCurrentNavigation();
    if (nav && nav.extras && nav.extras.state) {
      this.body = nav.extras.state['post']['body'] as string;
      this.id = nav.extras.state['post']['id'] as number;
      this.title = nav.extras.state['post']['title'] as string;
      this.username = nav.extras.state['user']['username'] as string;
      this.userFullName = nav.extras.state['user']['name'] as string;
    }
  }

  public backClicked() {
    this.location.back();
  }
}
