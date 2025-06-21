interface WindowWithLocalStorage extends Window {
  localStorageServiceInstance?: LocalStorageService;
}

class LocalStorageService {
  private storage: Storage | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.storage = window.localStorage;
    }
  }

  set<T>(key: string, value: T): void {
    if (!this.storage) return;
    try {
      const serializedValue =
        typeof value === "string" ? value : JSON.stringify(value);
      this.storage.setItem(key, serializedValue);
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  }

  get<T>(key: string, defaultValue: T | null = null): T | null {
    if (!this.storage) return defaultValue;
    try {
      const item = this.storage.getItem(key);
      if (item === null) {
        return defaultValue;
      }

      if (this.isJsonString(item)) {
        return JSON.parse(item);
      }

      return item as unknown as T;
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return defaultValue;
    }
  }

  remove(key: string): void {
    if (!this.storage) return;
    this.storage.removeItem(key);
  }

  clear(): void {
    if (!this.storage) return;
    this.storage.clear();
  }

  has(key: string): boolean {
    if (!this.storage) return false;
    return this.storage.getItem(key) !== null;
  }

  keys(): string[] {
    if (!this.storage) return [];
    return Object.keys(this.storage);
  }

  private isJsonString(str: string): boolean {
    try {
      JSON.parse(str);
      return true;
    } catch {
      return false;
    }
  }
}

const getLocalStorageService = (): LocalStorageService => {
  if (typeof window === "undefined") {
    return {
      set: () => {},
      get: () => null,
      remove: () => {},
      clear: () => {},
      has: () => false,
      keys: () => [],
    } as unknown as LocalStorageService;
  }

  if (!(window as WindowWithLocalStorage).localStorageServiceInstance) {
    (window as WindowWithLocalStorage).localStorageServiceInstance =
      new LocalStorageService();
  }

  return (window as WindowWithLocalStorage)
    .localStorageServiceInstance as LocalStorageService;
};

const localStorageService = getLocalStorageService();
export default localStorageService;
