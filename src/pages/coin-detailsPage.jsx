import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
const API_URL = import.meta.env.VITE_COIN_API_URL;

const CoinDetailsPage = () => {
	const { id } = useParams();

	const [coin, setCoin] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchCoin = async () => {
			try {
				const res = await fetch(`${API_URL}/${id}`);
				if (!res.ok) throw new Error("Failed to fetch data");
				const data = await res.json();
				console.log(data);
				setCoin(data);
			} catch (err) {
				setError(err.message);
				setLoading(false);
			} finally {
				setLoading(false);
			}
		};
		fetchCoin();
	}, [id]);

	return (
		<div className="coin-details-container">
			<Link to="/">Back To Home</Link>

			<h1 className="coin-details-title">
				{coin ? `${coin.name} (${coin.symbol})` : "Coin Details"}
			</h1>
			{loading && <p>Loading...</p>}
			{error && <div className="error">{error}</div>}

			{!loading && !error && (
				<>
					<img
						src={coin.image.large}
						alt={coin.name}
						className="coin-details-image"
					/>

					<p>{coin.description.en.split(". ")[0] + "."}</p>

					<div className="coin-details-info">
						<h3>Rank: #{coin.market_cap_rank}</h3>
						<h4>
							Last Updated: {new Date(coin.last_updated).toLocaleDateString()}
						</h4>
					</div>
				</>
			)}
			{!loading && !error && !coin && <p>No Coin Data</p>}
		</div>
	);
};

export default CoinDetailsPage;
