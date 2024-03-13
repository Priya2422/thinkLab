import "./list.css";
import Barcode from "react-jsbarcode";
export const List = ({ item, onClick }) => {
  return (
    <div className="list" onClick={onClick}>
      <p>{item.manufacturer}</p>
      <Barcode value={item.cellId} />
      <img src={`http://localhost:3000/${item.cellImage}`} alt="image" />
    </div>
  );
};
