import React from "react";
import ActionButton from "./components/ActionButton";
import Stock from "./components/Stock";

export type StockType = {
  id: number;
  name: string,
  open: string;
  high: string;
  low: string;
  marketCapital: string;
  peRatio: string;
  dividentYield: string;
}

function App() {
  const [stocks, setStocks] = React.useState<StockType[]>([
    {
      id: 1,
      name: "Apple",
      open: "100",
      high: "100",
      low: "100",
      marketCapital: "100",
      peRatio: "100",
      dividentYield: "100",
    },
    {
      id: 2,
      name: "Microsoft",
      open: "200",
      high: "200",
      low: "200",
      marketCapital: "200",
      peRatio: "200",
      dividentYield: "200",
    },
  ]);
  const [filteredStocks, setFilteredStocks] = React.useState<StockType[]>(stocks);
  const [searchText, setSearchText] = React.useState("");

  const handleSaveStock = React.useCallback((stock: StockType) => {
    setStocks(prev => prev.map(prevStock => prevStock.id === stock.id ? stock : prevStock));
  }, []);

  const handleDeleteStock = React.useCallback((stockId: number) => {
    setStocks(prev => prev.filter(stock => stock.id !== stockId));
  }, []);

  const handleAddStock = React.useCallback(() => {
    setStocks(prev => [...prev, {
      id: Date.now(),
      name: "XYZ",
      open: "0",
      high: "0",
      low: "0",
      marketCapital: "0",
      peRatio: "0",
      dividentYield: "0",
    }]);
  }, []);

  React.useEffect(() => {
    setFilteredStocks(stocks.filter(stock => stock.name.toLowerCase().includes(searchText.toLowerCase())));
  }, [stocks, searchText]);

  return (
    <div className="w-[85vw] h-screen mx-auto my-10">
      <ActionButton onClick={handleAddStock} />
      <div className="text-sky-500 text-2xl font-bold">Stocks CRUD</div>
      <input
        className="w-full border-gray-300 border-2 my-5 focus:border-blue-500 px-4 py-2 rounded-lg" 
        placeholder="Search by stock name"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
       />
      <div className={`bg-white rounded-lg shadow-lg w-full ${filteredStocks.length === 0 && 'pb-5'}`}>
        <div className="font-bold grid grid-cols-9 gap-5 justify-between text-lg px-3 bg-sky-500 py-4 text-white rounded-t-lg">
          <div className="col-span-2">Stock Name</div>
          <div>Open</div>
          <div>High</div>
          <div>Low</div>
          <div>Market Capital</div>
          <div>P/E Ratio</div>
          <div>Divident Yield</div>
          <div>Actions</div>
        </div>
        {filteredStocks.map((stock) => (
          <Stock onDeleteStock={handleDeleteStock} onSaveClick={handleSaveStock} stock={stock} key={stock.id} />
        ))}
        {filteredStocks.length === 0 && <div className="text-center text-gray-500 font-semibold mt-5">No stocks found</div>}
      </div>
    </div>
  )
}

export default App;