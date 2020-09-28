export const prettifyPrice = (number) => {
	return new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(number);
};
