import styled from "styled-components";
import { useParams } from "react-router";

function Coin() {
  const { coinId } = useParams();
  console.log(coinId);
  return <div>Coin</div>;
}

export default Coin;
