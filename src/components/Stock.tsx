import React from "react";
import { StockType } from "../App";

const Stock: React.FC<{stock: StockType; onSaveClick: (stock: StockType) => void; onDeleteStock: (stockId: number) => void}> = (props) => {
    const [isEditMode, setEditMode] = React.useState(false);
    const [updatedStock, setUpdatedStock] = React.useState<StockType>(props.stock);

    React.useEffect(() => setUpdatedStock(props.stock), [props.stock]);
    
    const toggleEditMode = React.useCallback(() => setEditMode(prev => !prev), []);
    const handleSaveClick = React.useCallback(() => {
        props.onSaveClick(updatedStock);
        toggleEditMode();
    }, [props, updatedStock, toggleEditMode]);

    return <div className="grid grid-cols-7 gap-5 py-4 border-b-gray-200 border-b text-gray-700 hover:bg-gray-100 px-3 transition-all ease-out duration-300">
        {
            isEditMode ?
            <>
                <input type="number" value={updatedStock?.open} onChange={(e) => setUpdatedStock({...updatedStock, open: e.target.value})} className="w-full outline-none bg-transparent py-2 bg-gray-100" />
                <input type="number" value={updatedStock?.high} onChange={(e) => setUpdatedStock({...updatedStock, high: e.target.value})} className="w-full outline-none bg-transparent py-2 bg-gray-100" />
                <input type="number" value={updatedStock?.low} onChange={(e) => setUpdatedStock({...updatedStock, low: e.target.value})} className="w-full outline-none bg-transparent py-2 bg-gray-100" />
                <input type="number" value={updatedStock?.marketCapital} onChange={(e) => setUpdatedStock({...updatedStock, marketCapital: e.target.value})} className="w-full outline-none bg-transparent py-2 bg-gray-100" />
                <input type="number" value={updatedStock?.peRatio} onChange={(e) => setUpdatedStock({...updatedStock, peRatio: e.target.value})} className="w-full outline-none bg-transparent py-2 bg-gray-100" />
                <input type="number" value={updatedStock?.dividentYield} onChange={(e) => setUpdatedStock({...updatedStock, dividentYield: e.target.value})} className="w-full outline-none bg-transparent py-2 bg-gray-100" />
                <div className="flex gap-2">
                    <button className="text-sky-500" onClick={handleSaveClick}>Save</button>
                    <button className="text-sky-500" onClick={toggleEditMode}>Cancel</button>
                </div>
            </>
        :
            <>
                <div>{props.stock.open}
                </div>
                <div>{props.stock.high}
                </div>
                <div>{props.stock.low}
                </div>
                <div>{props.stock.marketCapital}
                </div>
                <div>{props.stock.peRatio}
                </div>
                <div>{props.stock.dividentYield}
                </div>
                <div className="flex gap-2">
                    <button className="text-sky-500" onClick={toggleEditMode}>Edit</button>
                    <button className="text-sky-500" onClick={() => props.onDeleteStock(props.stock.id)}>Delete</button>
                </div>
            </>
        }
    </div>;
}

export default Stock;