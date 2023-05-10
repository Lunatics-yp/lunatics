
import type {AnyAction, Store} from '@reduxjs/toolkit';

export type TSsrRenderProps = (url: string, data: Store<unknown, AnyAction>) => string;
