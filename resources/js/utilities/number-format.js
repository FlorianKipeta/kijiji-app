const format = new Intl.NumberFormat('en');



export function formatNumber(number) {
	return format.format(number);
}