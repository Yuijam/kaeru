export type TEntity = {
  id: string;
};

export type TPartialEntity<T> = Partial<Omit<T, 'id'>>;
