// Функция перемешивания массива. Алгоритм Фишера-Йетса.
export function shuffleArray<T = unknown>(array: T[]): void {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

// Получить случайное число из диапазона, включая min, не включая max.
// Вернёт целое число.
export function getRandomArbitrary(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min) + min);
}

// Получить случайное булево значение
export function getRandomBoolean(): boolean {
	return Math.random() >= 0.5;
}
