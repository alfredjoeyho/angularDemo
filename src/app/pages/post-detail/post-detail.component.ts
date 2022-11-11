import { PostService } from './../../shared/services/post.service';
import { Post } from './../store/posts';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { Location } from '@angular/common';
import { User } from '../store/user';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  body: string = '';
  username: string = '';
  userFullName: string = '';
  id: number = 0;
  title: string = '';

  post: Observable<Post>;
  user: Observable<User>;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('postId');

    if (postId) {
      this.postService.getPostById(Number(postId));
    }

    // let nav: Navigation | null = this.router.getCurrentNavigation();
    // if (nav && nav.extras && nav.extras.state) {
    //   this.body = nav.extras.state['post']['body'] as string;
    //   this.id = nav.extras.state['post']['id'] as number;
    //   this.title = nav.extras.state['post']['title'] as string;
    //   this.username = nav.extras.state['user']['username'] as string;
    //   this.userFullName = nav.extras.state['user']['name'] as string;
    // }
  }

  public backClicked() {
    this.location.back();
  }
}
