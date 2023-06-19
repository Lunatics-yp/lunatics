import {GameBattle} from 'client/src/game/battle';
import {PATHS} from 'client/src/routers/name';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

export const useBattle = (battle: GameBattle) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (!battle) {
			navigate(PATHS.home);
		}
	}, [battle, navigate]);

	return battle;
};
