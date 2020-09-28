export const request = async (url, body = null, method = "GET", tokenNeeded = true) => {
	const config = {
		headers: { "Content-Type": "application/json" },
		method,
		body: body ? JSON.stringify(body) : null,
	};

	if (tokenNeeded) {
		const userToken = localStorage.getItem("token");
		config.headers.Authorization = `Bearer ${userToken}`;
	}

	try {
		const response = await fetch(url, config);
		const data = await response.json();
		if (!response.ok) {
			throw new Error(data.message);
		}

		return data;
	} catch (error) {
		throw new Error(error.message);
	}
};
