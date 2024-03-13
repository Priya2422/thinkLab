import { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import { Bars } from "react-loader-spinner";
import "./listpage.css";
const ListPage = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3000/app/get");
      console.log(response);
      setItems(response.data.items);
    };
    fetchData();
  }, []);
  console.log(items);
  if (items.length === 0)
    return (
      <div className="loader">
        <Bars
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );

  return (
    <div>
      <Card items={items} />
    </div>
  );
};

export default ListPage;
