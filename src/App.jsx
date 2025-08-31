import { useEffect, useState } from "react";
const API_URL =
	"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

const App = () => {
	const [coins, setCoins] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchCoins = async () => {
			try {
				const res = await fetch(API_URL);
				if (!res.ok) throw new Error("Failed to fetch data");
				const data = await res.json();
				console.log(data);
				setCoins(data);
			} catch (err) {
				setError(err.message);
				setLoading(false);
			} finally {
				setLoading(false);
			}
		};

		fetchCoins();

		// fetch(API_URL)
		// 	.then((res) => {
		// 		if (!res.ok) throw new Error("Failed to fetch data");
		// 		return res.json();
		// 	})
		// 	.then((data) => {
		// 		console.log(data);
		// 		setCoins(data);
		// 		setLoading(false);
		// 	})
		// 	.catch((err) => {
		// 		setError(err.message);
		// 		setLoading(false);
		// 	});
	}, []);

	return <h1>Crypto Board</h1>;
};

export default App;
