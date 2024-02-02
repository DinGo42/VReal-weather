export const localStorageUtilsGenerator = <T>(key: string) => ({
  get: (): T | null => {
    const response = localStorage.getItem(key);
    if (!response) return null;
    return JSON.parse(response) as T;
  },
  set: (value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  del: () => {
    localStorage.removeItem(key);
  },
});
