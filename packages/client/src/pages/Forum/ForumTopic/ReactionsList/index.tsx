import {FC} from 'react';
import {Angry} from 'client/src/components/Reactions/Angry';
import {Laughing} from 'client/src/components/Reactions/Laughing';
import {Disbelief} from 'client/src/components/Reactions/Disbelief';
import {Love} from 'client/src/components/Reactions/Love';
import {Puke} from 'client/src/components/Reactions/Puke';
import {Sad} from 'client/src/components/Reactions/Sad';
import {ThumbUp} from 'client/src/components/Reactions/ThumbUp';
import {ThumbDown} from 'client/src/components/Reactions/ThumbDown';
import {REACTIONS} from 'client/src/config/constants';
import styles from './reactionList.module.scss';
import {TReactionList} from './typing';

export const ReactionsList: FC<TReactionList> = props => {
	const {onReact} = props;
	return (
		<div className={styles.reaction__list}>
			<div
				className={styles.reaction__item}
				onClick={() => {
					onReact(REACTIONS.THUMB_UP);
				}}>
				<ThumbUp/>
			</div>
			<div
				className={styles.reaction__item}
				onClick={() => {
					onReact(REACTIONS.ANGRY);
				}}>
				<Angry/>
			</div>
			<div
				className={styles.reaction__item}
				onClick={() => {
					onReact(REACTIONS.LAUGHING);
				}}>
				<Laughing/>
			</div>
			<div
				className={styles.reaction__item}
				onClick={() => {
					onReact(REACTIONS.DISBELIEF);
				}}>
				<Disbelief/>
			</div>
			<div
				className={styles.reaction__item}
				onClick={() => {
					onReact(REACTIONS.SAD);
				}}>
				<Sad/>
			</div>
			<div
				className={styles.reaction__item}
				onClick={() => {
					onReact(REACTIONS.PUKE);
				}}>
				<Puke/>
			</div>
			<div
				className={styles.reaction__item}
				onClick={() => {
					onReact(REACTIONS.LOVE);
				}}>
				<Love/>
			</div>
			<div
				className={styles.reaction__item}
				onClick={() => {
					onReact(REACTIONS.THUMB_DOWN);
				}}>
				<ThumbDown/>
			</div>
		</div>
	);
};
