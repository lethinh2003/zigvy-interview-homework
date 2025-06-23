import { useCallback, useEffect, useState } from "react";
import { useSearchParams as useNextSearchParams } from "next/navigation";
import { useRouter, usePathname } from "next/navigation";

interface SearchParamsState {
  [key: string]: string | undefined;
}

interface UseSearchParamsOptions {
  syncWithUrl?: boolean;
  debounceMs?: number;
}

export function useSearchParams(options: UseSearchParamsOptions = {}) {
  const { syncWithUrl = true, debounceMs = 300 } = options;

  const router = useRouter();
  const pathname = usePathname();
  const nextSearchParams = useNextSearchParams();

  const [localParams, setLocalParams] = useState<SearchParamsState>({});
  const [debouncedParams, setDebouncedParams] = useState<SearchParamsState>({});

  // Initialize local params from URL
  useEffect(() => {
    if (syncWithUrl) {
      const urlParams: SearchParamsState = {};
      nextSearchParams.forEach((value, key) => {
        urlParams[key] = value;
      });
      setLocalParams(urlParams);
      setDebouncedParams(urlParams);
    }
  }, [nextSearchParams, syncWithUrl]);

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedParams(localParams);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [localParams, debounceMs]);

  // Sync to URL when debounced params change
  useEffect(() => {
    if (syncWithUrl) {
      const params = new URLSearchParams();

      Object.entries(debouncedParams).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          params.set(key, value);
        }
      });

      const searchString = params.toString();
      const newUrl = searchString ? `${pathname}?${searchString}` : pathname;

      router.replace(newUrl, { scroll: false });
    }
  }, [debouncedParams, pathname, router, syncWithUrl]);

  const setParam = useCallback((key: string, value: string | undefined) => {
    setLocalParams((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const setParams = useCallback((params: SearchParamsState) => {
    setLocalParams((prev) => ({
      ...prev,
      ...params,
    }));
  }, []);

  const getParam = useCallback(
    (key: string): string | undefined => {
      return localParams[key];
    },
    [localParams]
  );

  const removeParam = useCallback((key: string) => {
    setLocalParams((prev) => {
      const newParams = { ...prev };
      delete newParams[key];
      return newParams;
    });
  }, []);

  const clearParams = useCallback(() => {
    setLocalParams({});
  }, []);

  const hasParam = useCallback(
    (key: string): boolean => {
      return localParams[key] !== undefined && localParams[key] !== "";
    },
    [localParams]
  );

  const getAllParams = useCallback((): SearchParamsState => {
    return { ...localParams };
  }, [localParams]);

  return {
    // State
    params: localParams,
    debouncedParams,

    // Actions
    setParam,
    setParams,
    getParam,
    removeParam,
    clearParams,
    hasParam,
    getAllParams,

    // Utilities
    isDirty: JSON.stringify(localParams) !== JSON.stringify(debouncedParams),
  };
}
