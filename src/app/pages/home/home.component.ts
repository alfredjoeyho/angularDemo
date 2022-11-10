import { userNames } from '../store/userNames';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  EntityCollectionService,
  EntityCollectionServiceFactory,
} from '@ngrx/data';
import {
  combineLatest,
  first,
  map,
  Observable,
  Subscription,
  take,
} from 'rxjs';
import { Posts } from '../store/posts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  pages: number = 1;
  subscription1$: any;
  subscription2$: any;
  userNameEntered: string = '';

  constructor(
    serviceFactory: EntityCollectionServiceFactory,
    private router: Router
  ) {
    this.postService = serviceFactory.create<Posts>('Post');
    this.allPosts$ = this.postService.entities$;

    this.userNameService = serviceFactory.create<userNames>('userName');
    this.alluserNames$ = this.userNameService.entities$;
    this.filteredUser$ = this.userNameService.filteredEntities$;
  }

  allPosts$: Observable<Posts[]>;
  postService: EntityCollectionService<Posts>;

  alluserNames$: Observable<userNames[]>;
  filteredUser$: Observable<userNames[]>;
  filteredPost: Posts[] = [];
  allPost: Posts[] = [];
  userNameService: EntityCollectionService<userNames>;
  userid: number = 0;

  ngOnInit(): void {
    this.postService.getAll();
    this.userNameService.getAll();
    this.subscription2$ = this.allPosts$.subscribe((posts: Posts[]) => {
      this.allPost = posts;
    });
  }

  getPostDetails(post: Posts) {
    this.router.navigate(['/postdetails'], {
      state: { post: post },
    });
  }

  ngOnDestroy(): void {
    if (this.subscription1$) {
      this.subscription1$.unsubscribe();
    }
    this.subscription2$.unsubscribe();
  }

  searchUser(): any {
    this.allPost = <Posts[]>[];
    this.subscription1$ = combineLatest([
      this.filteredUser$.pipe(
        map((txs) => txs.find((txn) => txn.name === this.userNameEntered))
      ),
      this.allPosts$,
    ]).subscribe(
      ([res1, res2]) => {
        res2.forEach((element) => {
          if (element) {
            if (element.userId === res1?.id) {
              this.allPost.push(element);
            }
          }
        });
      },
      (err) => console.error(err)
    );
  }
}
