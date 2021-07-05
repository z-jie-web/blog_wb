import { useState, useCallback } from 'react';

export function isFunction(obj: any): obj is Function {
  return typeof obj === 'function';
}

const useSetState = <T extends object>(
  initialState: T = {} as T,
): [T, (patch: Partial<T> | ((prevState: T) => Partial<T>)) => void] => {
  const [state, setState] = useState<T>(initialState);

  const setMergeState = useCallback((patch) => {
    setState((prevState) => ({
      ...prevState,
      ...(isFunction(patch) ? patch(prevState) : patch),
    }));
  }, []);

  return [state, setMergeState];
};

export default useSetState;
