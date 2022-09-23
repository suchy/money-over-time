export const storage = {
  get<T>(key: string) {
    try {
      const stringValue = localStorage.getItem(key);

      if (!stringValue) {
        return null;
      }

      const parsedValue: T = JSON.parse(stringValue);

      return parsedValue;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Storage get failed on key: ${key}.`);
      return null;
    }
  },

  set: (key: string, value: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Storage set failed on key: ${key}.`);
      return false;
    }
  },

  remove: (key: string) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Storage remove failed on key: ${key}.`);
      return false;
    }
  }
};
