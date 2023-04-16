// Все функции-геттеры хранятся здесь

export function getNextId(arr: {id: number}[]) {
	return arr[arr.length-1].id+1;
}
