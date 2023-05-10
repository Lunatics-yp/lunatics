const TEAM_NAME = 'lunatics';

const RATING_FIELD_NAME = `${TEAM_NAME}__score`;

const LEADER_LIMIT_USERS = 10;

const LEADER_BOARD_URL = 'leaderboard';

const LEADER_BOARD_BY_TEAM = (teamName: string) => `${LEADER_BOARD_URL}/${teamName}`;

const LEADER_BOARD_All = `${LEADER_BOARD_URL}/all`;

export {
	TEAM_NAME,
	RATING_FIELD_NAME,
	LEADER_LIMIT_USERS,
	LEADER_BOARD_BY_TEAM,
	LEADER_BOARD_URL,
	LEADER_BOARD_All,
};
