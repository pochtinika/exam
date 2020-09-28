export const prettifyName = (name) => {
	const trimmedName = name.replace(/\s+/g, " ").trim();
	const words = trimmedName.split(" ");

	const modifiedWords = words.map((word) => word[0].toUpperCase() + word.slice(1));

	const prettyName = modifiedWords.join(" ");

	return prettyName;
};
