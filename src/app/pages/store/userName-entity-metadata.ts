import { EntityMetadataMap } from '@ngrx/data';
import { userNames } from './userNames';

export const userNamesEntityMetaData: EntityMetadataMap = {
  userName: {
    //search can be anything what we set for filteration.
    filterFn: (entities: { name: string }[], search: string) => {
      return entities.filter((entity) => -1 < entity.name.indexOf(search));
    },
  },
};
