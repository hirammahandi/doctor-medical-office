import {
  type ForwardedRef,
  type ReactElement,
  type RefAttributes,
} from 'react';

export type Nill<T> = {
  [K in keyof T]: T[K] extends null ? T[K] | null | undefined : T[K];
};

export type GenericForwardRef = <T, P = Record<string, unknown>>(
  render: (props: P, ref: ForwardedRef<T>) => ReactElement | null,
) => (props: P & RefAttributes<T>) => ReactElement | null;

export type ActionsResult<TActionResult> = Promise<
  TActionResult | { error: string }
>;
