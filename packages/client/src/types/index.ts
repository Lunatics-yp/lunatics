// Тип для функций. Fn<что_на_выходе, что_на_входе>
export type Fn<T, A = unknown> = (...args: A[]) => T;
