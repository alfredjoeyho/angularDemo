import { concatMap, filter, Observable, tap } from 'rxjs';
import { User } from './../../pages/store/user';
import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';

@Injectable({
  providedIn: 'root',
})
export class UserService extends EntityCollectionServiceBase<User> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('User', serviceElementsFactory);
  }
  public getAllUsers(): Observable<User[]> {
    return this.loaded$.pipe(
      tap((loaded: boolean) => {
        if (!loaded) this.getAll();
      }),
      filter((loaded: boolean) => loaded),
      concatMap(() => this.entities$.pipe())
    );
  }
}
