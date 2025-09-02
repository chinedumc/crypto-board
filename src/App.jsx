import { useEffect, useState } from "react";

import HomePage from "./pages/homePage";
import {Routes, Route } from "react-router";
const API_URL = import.meta.env.VITE_API_URL;
const App = () => {
	const [coins, setCoins] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [limit, setLimit] = useState(10);
	const [filter, setFilter] = useState("");
	const [sortBy, setSortBy] = useState("market_cap_desc");

	useEffect(() => {
		const fetchCoins = async () => {
			try {
				const res = await fetch(
					`${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
				);
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
	}, [limit]);

	return (
	
			<Routes>
				
        <Route path='/' element={<HomePage coins={coins} filter={filter} setFilter={setFilter}/>}/>
			</Routes>
	
	);
};

export default App;
