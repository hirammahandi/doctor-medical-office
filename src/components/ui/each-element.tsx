import { Children, type ReactNode } from 'react';

interface EachElementProps<T extends unknown[]> {
  of: T;
  render: (item: T[number], index: number) => ReactNode;
}

export const EachElement = <T extends unknown[]>({
  of,
  render,
}: EachElementProps<T>) => {
  return Children.toArray(
    of.map((item: T[number], index: number) => render(item, index)),
  );
};
