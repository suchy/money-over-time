import { FirebaseClientFactory } from './client';
import { mapTimestampsToDates } from './mapTimestampsToDates';

export const FirebaseRepositoryFactory = <
  CollectionType extends Record<string, unknown>
>(
  collectionName: string,
  idField: string
) => {
  const firebaseClient = FirebaseClientFactory();

  const converter = <T>() => ({
    toFirestore: (data: Partial<T>) => data,
    fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) => {
      const documentData = snap.data();
      const mappedDocument = mapTimestampsToDates(documentData) as T;
      return mappedDocument;
    }
  });

  const collection = firebaseClient
    .firestore()
    .collection(collectionName)
    .withConverter(converter<CollectionType>());

  const repository = {
    async findMany() {
      const documents = (await collection.get()).docs.map((document) =>
        document.data()
      );

      return documents;
    },

    async findOneById(id: string) {
      const document = await collection.doc(id).get();

      if (!document.exists) {
        return;
      }

      return document.data();
    },

    async insert(data: CollectionType) {
      const id = data[idField];

      if (!id) {
        throw new Error('Id is required');
      }

      if (typeof id !== 'string') {
        throw new Error('Id is onvalid');
      }

      await collection.doc(id).set(data);

      return data;
    },

    async deleteOneById(id: string) {
      const deleted = await collection.doc(id).delete();
      return !!deleted;
    },

    async update(data: CollectionType) {
      try {
        const id = data[idField];

        if (!id) {
          throw new Error('Id is required');
        }

        if (typeof id !== 'string') {
          throw new Error('Id is onvalid');
        }

        await collection.doc(id).update(data);

        return data;
      } catch (error) {
        console.error(error);
        return undefined;
      }
    }
  };

  return repository;
};
