import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Barcode from "react-jsbarcode";
import ReactSpeedometer from "react-d3-speedometer/slim";
import circuit from "../assets/circuit.jpeg";
import "./item.css";
import { Bars } from "react-loader-spinner";
const Item = () => {
  const { cellId } = useParams();
  const [item, setItem] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:3000/app/${cellId}`);
      setItem(response.data.item);
    };
    fetchData();
  }, [cellId]);
  if (!item) {
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
  }
  return (
    <div className="container">
      <h1>{item.manufacturer}</h1>

      <img src={`http://localhost:3000/${item.cellImage}`} alt="cell" />
      <Barcode value={item.cellId} />
      <div className="main">
        <img src={`http://localhost:3000/${item.plot}`} alt="cell" />
        <img src={circuit} alt="cell" />
        <span className="rb">{item.parameters[0].toPrecision(4)}</span>
        <span className="rsei">{item.parameters[1].toPrecision(4)}</span>
        <span className="csei">{item.parameters[2].toPrecision(4)}</span>
        <span className="ct">{item.parameters[3].toPrecision(4)}</span>
        <span className="cdl">{item.parameters[4].toPrecision(4)}</span>
        <span className="war">{item.parameters[5].toPrecision(4)}</span>
      </div>
      <div className="metaData">
        <p>
          <b>Model</b> : {item.model}
        </p>
        <p>
          <b>Mass</b> : {item.mass}
        </p>
        <p>
          <b>Type</b> : {item.type}
        </p>
        <p>
          <b>Form Factor</b> : {item.formFactor}
        </p>
        <p>
          <b>Volume</b> : {item.volume}
        </p>
        <p>
          <b>Height</b> : {item.height}
        </p>
        <p>
          <b>Diameter</b> : {item.diameter}
        </p>
        <p>
          <b>SOH</b> : {item.soh.$numberDecimal} %
        </p>
      </div>
      <table>
        <tr>
          <th>Paramater</th>
          <th>Value</th>
          <th>Explanation</th>
          <th>Visual Indicator</th>
        </tr>
        <tr>
          <td>Rb</td>
          <td>{item.parameters[0]}</td>
          <td>Electrolyte resistance</td>
          <td>
            <ReactSpeedometer
              minValue={0}
              maxValue={0.5}
              value={item.parameters[0]}
              segments={1}
            />
          </td>
        </tr>
        <tr>
          <td>R_SEI</td>
          <td>{item.parameters[1]}</td>
          <td>Resistance due to SEI layer</td>
          <td>
            <ReactSpeedometer
              minValue={0}
              maxValue={0.5}
              value={item.parameters[1]}
              segments={1}
            />
          </td>
        </tr>
        <tr>
          <td>CPE_SEI</td>
          <td>{item.parameters[2]}</td>
          <td>Capacitance due to SEI layer</td>
          <td>
            <ReactSpeedometer
              minValue={0}
              maxValue={10}
              value={item.parameters[2]}
              segments={1}
            />
          </td>
        </tr>
        <tr>
          <td>R_CT</td>
          <td>{item.parameters[3]}</td>
          <td>
            charge-transfer resistance that models the voltage drop over the
            electrode–electrol yte interface due to a load
          </td>
          <td>
            <ReactSpeedometer
              minValue={0}
              maxValue={0.5}
              value={item.parameters[3]}
              segments={1}
            />
          </td>
        </tr>
        <tr>
          <td>CPE_DL</td>
          <td>{item.parameters[4]}</td>
          <td>
            Double-layer capacitance that models the effect of charges building
            up in the electrolyte at the electrode surface
          </td>
          <td>
            <ReactSpeedometer
              minValue={0}
              maxValue={0.5}
              value={item.parameters[4]}
              segments={1}
            />
          </td>
        </tr>
        <tr>
          <td>W_Warburg</td>
          <td>{item.parameters[5]}</td>
          <td>
            Frequency-depend ent Warburg impedance models diffusion of lithium
            ions in the electrodes
          </td>
          <td>
            <ReactSpeedometer
              minValue={10}
              maxValue={1000}
              value={item.parameters[5]}
              segments={1}
            />
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Item;
