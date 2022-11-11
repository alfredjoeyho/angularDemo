import { EntityMetadataMap } from '@ngrx/data';
import { Post } from './posts';

export const postsEntityMetaData: EntityMetadataMap = {
  Post: {
    selectId: (post: Post) => post.id,
  },
};
