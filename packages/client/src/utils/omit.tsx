export function omit<T extends Record<string, unknown>, T2 extends [...(keyof T)[]]>(
	obj: T,
	field: T2,
): {
	[K2 in Exclude<keyof T, T2[number]>]: T[K2];
} {
	const result = {} as {
		[K2 in Exclude<keyof T, T2[number]>]: T[K2];
	};
	Object.keys(obj).forEach((key) => {
		if (!field.includes(key)) {
			result[key] = obj[key];
		}
	});
	return result;
}
