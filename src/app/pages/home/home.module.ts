import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityDefinitionService } from '@ngrx/data';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { postsEntityMetaData } from '../store/post-entity-metadata';
import { usersEntityMetaData } from '../store/user-entity-metadata';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, FormsModule, HomeRoutingModule, NgxPaginationModule],
})
export class HomeModule {
  constructor(entityDefinitionService: EntityDefinitionService) {
    entityDefinitionService.registerMetadataMap(postsEntityMetaData);
    entityDefinitionService.registerMetadataMap(usersEntityMetaData);
  }
}
