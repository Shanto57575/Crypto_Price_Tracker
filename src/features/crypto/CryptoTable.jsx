import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePrices } from "./cryptoSlice";

const CryptoTable = () => {
	const dispatch = useDispatch();
	const assets = useSelector((state) => state.crypto.assets);
	const [sortConfig, setSortConfig] = useState({
		key: null,
		direction: "ascending",
	});
	const [hoveredRow, setHoveredRow] = useState(null);

	useEffect(() => {
		const interval = setInterval(() => {
			dispatch(updatePrices());
		}, 2000);
		return () => clearInterval(interval);
	}, [dispatch]);

	const sortData = (key) => {
		let direction = "ascending";
		if (sortConfig.key === key && sortConfig.direction === "ascending") {
			direction = "descending";
		}
		setSortConfig({ key, direction });
	};

	const sortedAssets = [...assets].sort((a, b) => {
		if (sortConfig.key === null) return 0;

		const valueA = a[sortConfig.key];
		const valueB = b[sortConfig.key];

		if (valueA < valueB) {
			return sortConfig.direction === "ascending" ? -1 : 1;
		}
		if (valueA > valueB) {
			return sortConfig.direction === "ascending" ? 1 : -1;
		}
		return 0;
	});

	const renderSortIcon = (key) => {
		if (sortConfig.key !== key) return "⇅";
		return sortConfig.direction === "ascending" ? "↑" : "↓";
	};

	return (
		<div className="bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-10">
					<h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 mb-2">
						Real-Time Crypto Tracker
					</h1>
					<p className="text-gray-600">
						Live prices and stats updated every 2 seconds
					</p>
				</div>

				<div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
					<div className="overflow-x-auto">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
								<tr>
									{[
										{ key: "rank", label: "#" },
										{ key: "logo", label: "" },
										{ key: "name", label: "Name" },
										{ key: "symbol", label: "Symbol" },
										{ key: "price", label: "Price" },
										{ key: "percentChange1h", label: "1h %" },
										{ key: "percentChange24h", label: "24h %" },
										{ key: "percentChange7d", label: "7d %" },
										{ key: "marketCap", label: "Market Cap" },
										{ key: "volume24h", label: "24h Volume" },
										{ key: "circulatingSupply", label: "Circulating" },
										{ key: "maxSupply", label: "Max Supply" },
										{ key: "chart", label: "7D Chart" },
									].map((column) => (
										<th
											key={column.key}
											onClick={() =>
												column.key !== "logo" && column.key !== "chart"
													? sortData(column.key)
													: null
											}
											className={`px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider text-left ${
												column.key !== "logo" && column.key !== "chart"
													? "cursor-pointer hover:bg-indigo-50"
													: ""
											}`}
										>
											<div className="flex items-center space-x-1">
												<span>{column.label}</span>
												{column.key !== "logo" && column.key !== "chart" && (
													<span className="text-indigo-400">
														{renderSortIcon(column.key)}
													</span>
												)}
											</div>
										</th>
									))}
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-100">
								{sortedAssets.map((coin, index) => (
									<tr
										key={coin.id}
										onMouseEnter={() => setHoveredRow(coin.id)}
										onMouseLeave={() => setHoveredRow(null)}
										className={`${
											hoveredRow === coin.id
												? "bg-indigo-50"
												: "hover:bg-gray-50"
										} transition-colors duration-200`}
									>
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
											{index + 1}
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center">
												<img
													src={coin.logo}
													alt={coin.symbol}
													className="w-6 h-6 rounded-full"
												/>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
											{coin.name}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 uppercase">
											{coin.symbol}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
											${coin.price.toLocaleString()}
										</td>
										<td
											className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
												coin.percentChange1h >= 0
													? "text-green-500"
													: "text-red-500"
											}`}
										>
											<div className="flex items-center">
												<span className="mr-1">
													{coin.percentChange1h >= 0 ? "▲" : "▼"}
												</span>
												{Math.abs(coin.percentChange1h)}%
											</div>
										</td>
										<td
											className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
												coin.percentChange24h >= 0
													? "text-green-500"
													: "text-red-500"
											}`}
										>
											<div className="flex items-center">
												<span className="mr-1">
													{coin.percentChange24h >= 0 ? "▲" : "▼"}
												</span>
												{Math.abs(coin.percentChange24h)}%
											</div>
										</td>
										<td
											className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
												coin.percentChange7d >= 0
													? "text-green-500"
													: "text-red-500"
											}`}
										>
											<div className="flex items-center">
												<span className="mr-1">
													{coin.percentChange7d >= 0 ? "▲" : "▼"}
												</span>
												{Math.abs(coin.percentChange7d)}%
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											${coin.marketCap.toLocaleString()}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											${coin.volume24h.toLocaleString()}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{coin.circulatingSupply.toLocaleString()}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{coin.maxSupply ? coin.maxSupply.toLocaleString() : "∞"}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{coin.chart}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				<div className="mt-6 text-center text-gray-500 text-sm">
					<p>Data refreshes automatically every 2 seconds</p>
				</div>
			</div>
		</div>
	);
};

export default CryptoTable;
