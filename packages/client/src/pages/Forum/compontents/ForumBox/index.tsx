import {useState} from 'react';
import {useInput} from 'client/src/hooks/useInput';
import {ForumColumn} from '../ForumColumn';
import {ForumHeader} from '../ForumHeader';
import {Button} from 'client/src/components/Button';
import styles from './ForumBox.module.scss';

const dataMock = [
	{
		id: 1,
		forums: 'lalal',
		topics: 58,
		answers: 77
	},
	{
		id: 2,
		forums: 'laladdwl',
		topics: 5,
		answers: 8
	},
	{
		id: 3,
		forums: 'PRiVET',
		topics: 5,
		answers: 8
	}
];

type TDataMock = {
	id: number;
	forums: string;
	topics: number;
	answers: number;
};

export const ForumBox = () => {

	const [value, setValue] = useState(dataMock);
	const newTopic = useInput('');

	const ForumColumnElements = value.map((forum: TDataMock) => (
		<ForumColumn
			key={forum.id}
			id={forum.id}
			forum={forum.forums}
			topics={forum.topics}
			answers={forum.answers}
		/>
	));

	function createTopic() {

		if (newTopic.value) {

			setValue(prev => [...prev, {
				id: prev[prev.length-1].id + 1 ,
				forums: newTopic.value,
				topics: 0,
				answers: 0
			}]);
		}

		newTopic.reset();

	}

	return (
		<>
			<div className={styles.wrapper}>
				<div className={styles.topic__list}>
					<ForumHeader/>
					<div></div>
					<input
						onChange={newTopic.onChange}
						value={newTopic.value}
						type='text'
						placeholder='Новая тема'
						className={styles.input}
						maxLength={50}
					/>
					<div className={styles.button}>
						<Button
							disabled={!newTopic.value}
							text='Создать форум'
							onClick={createTopic}
						/>
					</div>
					{ForumColumnElements.reverse()}
				</div>
			</div>
		</>
	);
};
