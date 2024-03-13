import { useNavigate } from "react-router-dom";
import { List } from "./List";
import "./card.css";

const Card = ({ items }) => {
    const navigate=useNavigate();
    const handleClick=(id)=>{
        navigate(`${id}`);
    }
  return (
    <div className="card" >
      {items.map((item) => {
        return <List key={item._id} item={item} onClick={()=>handleClick(item._id)} />;
      })}
    </div>
  );
};

export default Card;
