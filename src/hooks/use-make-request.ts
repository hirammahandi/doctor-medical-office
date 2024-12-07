import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { AbortedMessages, ErrorsMessages } from '@/lib/constants';

export type RequestOptions<Args = unknown> = Args & {
  signal: AbortSignal;
};

export type RequestFunction<T, Args extends RequestOptions> = (
  args: Args,
) => Promise<T>;

type UseRequestOptions = {
  timeout?: number;
};

export function useRequest<T, Args extends RequestOptions>(
  requestFunction: RequestFunction<T, Args>,
  options: UseRequestOptions = { timeout: 30000 },
) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const makeRequest = async (args: Omit<Args, 'signal'>): Promise<T> => {
    setLoading(true);
    setError(null);

    if (controllerRef.current) {
      controllerRef.current.abort(AbortedMessages.REQUEST_ABORTED);
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    if (options.timeout) {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }

      timeoutIdRef.current = setTimeout(() => {
        controllerRef.current?.abort(AbortedMessages.TIMEOUT_EXCEEDED);
      }, options.timeout);
    }

    try {
      const result = await requestFunction({
        ...args,
        signal: controllerRef.current.signal,
      } as Args);
      setLoading(false);
      return result;
    } catch (err) {
      if (err === AbortedMessages.TIMEOUT_EXCEEDED) {
        toast.error(ErrorsMessages.TIMEOUT_EXCEEDED);
      }
      if ((err as Record<'name', string>).name !== 'AbortError') {
        setError(err);
      }
      setLoading(false);
      throw err;
    } finally {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
    }
  };

  const cancelRequest = (): void => {
    if (controllerRef.current) {
      controllerRef.current.abort(AbortedMessages.REQUEST_ABORTED);
      controllerRef.current = null;
    }
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort(AbortedMessages.REQUEST_ABORTED);
      }
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  return { makeRequest, cancelRequest, loading, error };
}
