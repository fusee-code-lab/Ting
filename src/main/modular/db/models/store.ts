import Realm, { ObjectSchema } from 'realm';

export const store_name = 'Store';

export class Store extends Realm.Object {
  key!: string;
  data!: string;

  static schema: ObjectSchema = {
    name: store_name,
    primaryKey: 'key',
    properties: {
      key: 'string',
      data: 'string'
    }
  };
}
