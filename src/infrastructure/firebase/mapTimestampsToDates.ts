import isObjectLike from 'lodash/isObjectLike';
import isPlainObject from 'lodash/isPlainObject';

export const mapTimestampsToDates = (obj: FirebaseFirestore.DocumentData) => {
  const entries = Object.entries(obj);

  const mappedEntries = mapEntries(entries);

  return mappedEntries;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapEntries = (entries: [string, any][]) => {
  const mappedEntries = entries.map(([key, value]) => {
    const isFirebaseTimestamp =
      value.constructor.name === 'Timestamp' &&
      typeof value.toDate === 'function';

    if (isFirebaseTimestamp) {
      const mappedValue = value.toDate();

      return [key, mappedValue];
    }

    if (isPlainObject(value)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mappedObject: any = mapEntries(Object.entries(value));

      return [key, mappedObject];
    }

    if (Array.isArray(value)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mappedArray: any[] = value.map((item) => {
        if (isObjectLike(item)) {
          const mappedObject = mapEntries(Object.entries(item));
          return mappedObject;
        }

        return item;
      });

      return [key, mappedArray];
    }

    return [key, value];
  });

  return Object.fromEntries(mappedEntries);
};
