import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageDetailComponent } from '../page-detail/page-detail.component';
import { PostDetailRoutingModule } from './post-detail-routing.module';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [PageDetailComponent],
  imports: [PostDetailRoutingModule, CommonModule, MatCardModule],
})
export class PostDetailModule {}
