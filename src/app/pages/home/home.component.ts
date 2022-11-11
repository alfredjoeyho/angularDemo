import { User } from '../store/user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  EntityCollectionService,
  EntityCollectionServiceFactory,
} from '@ngrx/data';
import { combineLatest, map, Observable, Subscription } from 'rxjs';
import { Post } from '../store/posts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  pages: number = 1;
  userNameEntered: string = '';

  allPosts$: Observable<Post[]>;
  postService: EntityCollectionService<Post>;

  allUsers$: Observable<User[]>;
  filteredUser$: Observable<User[]>;
  filteredPost: Post[] = [];
  allPosts: Post[] = [];
  userService: EntityCollectionService<User>;
  userid: number = 0;

  private subscriptions: Subscription[] = [];

  constructor(
    serviceFactory: EntityCollectionServiceFactory,
    private router: Router
  ) {
    this.postService = serviceFactory.create<Post>('Post');
    this.allPosts$ = this.postService.entities$;

    this.userService = serviceFactory.create<User>('User');
    this.allUsers$ = this.userService.entities$;
    this.filteredUser$ = this.userService.filteredEntities$;
  }

  ngOnInit(): void {
    this.postService.getAll();
    this.userService.getAll();
    this.subscriptions.push(
      this.allPosts$.subscribe((posts: Post[]) => {
        this.allPosts = posts;
      })
    );
  }

  getPostDetails(post: Post) {
    this.router.navigate(['/postdetails'], {
      state: { post: post },
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  searchUser() {
    this.allPosts = <Post[]>[];
    const data$ = combineLatest([
      this.filteredUser$.pipe(
        map((txs) => txs.find((txn) => txn.username === this.userNameEntered))
      ),
      this.allPosts$,
    ]);

    this.subscriptions.push(
      data$.subscribe(([res1, res2]) => {
        res2.forEach((element) => {
          if (element) {
            if (element.userId === res1?.id) {
              this.allPosts.push(element);
            }
          }
        });
      })
    );
  }
}
