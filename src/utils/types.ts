export type Nill<T> = {
  [K in keyof T]: T[K] extends null ? T[K] | null | undefined : T[K];
};
