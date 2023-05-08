import type {CombinedState} from '@reduxjs/toolkit';
import type {TAuthState} from 'client/src/stores/reducers/auth/typing';
import type {TUserSettingState} from 'client/src/stores/reducers/userSettings/typing';
import type {TForumState} from 'client/src/stores/reducers/forum/typing';

export type TSsrRenderProps = (url: string) => [
	CombinedState<{
		authReducer: TAuthState;
		userSettingsReducer: TUserSettingState;
		forumReducer: TForumState;
	}>,
	string,
];
