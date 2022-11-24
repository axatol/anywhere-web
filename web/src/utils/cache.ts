import { config } from "~/config";

const CACHE_KEY = "anywhere.cache";
const MS_IN_DAY = 86400000;

export interface CacheItem<T> {
  savedAt: number;
  data: T;
}

const save = <T>(key: string, data: T): boolean => {
  if (!localStorage) {
    return false;
  }

  const item: CacheItem<T> = { savedAt: Date.now(), data };
  localStorage.setItem(`${CACHE_KEY}.${key}`, JSON.stringify(item));
  return true;
};

const load = <T>(key: string, expiry = MS_IN_DAY): T | null => {
  if (!localStorage) {
    return null;
  }

  const value = localStorage.getItem(`${CACHE_KEY}.${key}`);
  if (value === null) {
    return null;
  }

  try {
    const item = JSON.parse(value) as CacheItem<T>;
    if (Date.now() > item.savedAt + expiry) {
      return null;
    }

    return item.data;
  } catch {
    // 🤷‍♂️
  }

  return null;
};

const wrap =
  <F extends (...args: any[]) => Promise<any>>(
    key: string,
    fn: F,
    expireInSeconds?: number,
  ) =>
  async (
    ...args: Parameters<typeof fn>
  ): Promise<Awaited<ReturnType<typeof fn>>> => {
    const cachedValue = load(key, expireInSeconds);
    if (cachedValue) {
      config.debug && console.log(`cache.${key}.hit`, cachedValue);
      return cachedValue as Awaited<ReturnType<typeof fn>>;
    }

    const newValue = await fn(...args);
    save(key, newValue);
    config.debug && console.log(`cache.${key}.miss`, cachedValue);
    return newValue as Awaited<ReturnType<typeof fn>>;
  };

export const cache = { save, load, wrap };
