import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from './reducers/auth/authSlice';
import userSettingsReducer from './reducers/userSettings/userSettingsSlice';
import forumReducer from './reducers/forum/forumSlice';
import leaderBoardReducer from './reducers/leaderBoard/leaderBoardSlice';

/**
 * Автоматически комбинирует slice reducers,
 * включает в себя работу с redux-thunk по умолчанию
 */
const rootReducer = combineReducers({
	authReducer,
	userSettingsReducer,
	forumReducer,
	leaderBoardReducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		devTools: process.env.NODE_ENV !== 'production',
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof setupStore>['dispatch'];
