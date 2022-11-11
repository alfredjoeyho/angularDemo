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
  userId: number = 0;
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
      this.userId = nav.extras.state['post']['userId'] as number;
      this.id = nav.extras.state['post']['id'] as number;
      this.title = nav.extras.state['post']['title'] as string;
    }
  }

  public backClicked() {
    this.location.back();
  }
}
