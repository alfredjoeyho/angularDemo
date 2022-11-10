import { EntityMetadataMap } from '@ngrx/data';
import { Posts } from './posts';

export const postsEntityMetaData: EntityMetadataMap = {
  Post: {
    selectId: (post: Posts) => post.id,
  },
};
