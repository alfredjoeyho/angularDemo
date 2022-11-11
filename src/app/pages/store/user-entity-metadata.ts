import { EntityMetadataMap } from '@ngrx/data';

export const usersEntityMetaData: EntityMetadataMap = {
  User: {
    // //search can be anything what we set for filteration.
    // filterFn: (entities: { name: string }[], search: string) => {
    //   return entities.filter((entity) => -1 < entity.name.indexOf(search));
    // },
  },
};
