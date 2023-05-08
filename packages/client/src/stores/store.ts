import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from './reducers/auth/authSlice';
import userSettingsReducer from './reducers/userSettings/userSettingsSlice';
import forumReducer from './reducers/forum/forumSlice';

/**
 * Автоматически комбинирует slice reducers,
 * включает в себя работу с redux-thunk по умолчанию
 */
const rootReducer = combineReducers({
	authReducer,
	userSettingsReducer,
	forumReducer,
});

export const setupStore = () => {
	const preloadedState = typeof window !== 'undefined' ? window.__PRELOADED_STATE__ : undefined;

	if (typeof window !== 'undefined') {
		delete window?.__PRELOADED_STATE__;
	}

	return configureStore({
		reducer: rootReducer,
		preloadedState,
		devTools: process.env.NODE_ENV !== 'production',
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof setupStore>['dispatch'];
