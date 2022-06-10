import styled, { keyframes } from "styled-components";
import { fetchCoinTickers } from "../api";
import { useQuery } from "react-query";

interface PriceProps {
  coinId: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: string;
  circulating_supply: string;
  total_supply: string;
  max_supply: string;
  beta_value: string;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const delayAnimation = keyframes`
  0%{
    opacity:0;
  }50%{
    opacity:0.5;
  }100%{
    
    opacity:1;
  }
`;

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<PriceData>(
    ["priceohlcv", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 10000,
    }
  );
  console.log("data", data);
  return (
    <Container>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <PriceItems>
          <Tags>
            <TagTitle>price :</TagTitle>
            <TagContent
              isMinus={data?.quotes.USD.price.toString().slice(0, 1) !== "-"}
            >
              {`$${data?.quotes.USD.price}`}
            </TagContent>
          </Tags>
          <Tags>
            <TagTitle>percent_change_1h :</TagTitle>
            <TagContent
              isMinus={
                data?.quotes.USD.percent_change_1h.toString().slice(0, 1) !==
                "-"
              }
            >
              {`${data?.quotes.USD.percent_change_1h}%`}
            </TagContent>
          </Tags>
          <Tags>
            <TagTitle>percent_change_6h :</TagTitle>
            <TagContent
              isMinus={
                data?.quotes.USD.percent_change_6h.toString().slice(0, 1) !==
                "-"
              }
            >
              {`${data?.quotes.USD.percent_change_6h}%`}
            </TagContent>
          </Tags>
          <Tags>
            <TagTitle>percent_change_24h :</TagTitle>
            <TagContent
              isMinus={
                data?.quotes.USD.percent_change_24h.toString().slice(0, 1) !==
                "-"
              }
            >
              {`${data?.quotes.USD.percent_change_24h}%`}
            </TagContent>
          </Tags>
          <Tags>
            <TagTitle>percent_change_7d :</TagTitle>
            <TagContent
              isMinus={
                data?.quotes.USD.percent_change_7d.toString().slice(0, 1) !==
                "-"
              }
            >
              {`${data?.quotes.USD.percent_change_7d}%`}
            </TagContent>
          </Tags>
        </PriceItems>
      )}
    </Container>
  );
}
const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
`;
const PriceItems = styled.div`
  div:first-child {
    animation-delay: 0.2s;
  }
  div:nth-child(2) {
    animation-delay: 0.4s;
  }
  div:nth-child(3) {
    animation-delay: 0.6s;
  }
  div:nth-child(4) {
    animation-delay: 0.8s;
  }
  div:nth-child(5) {
    animation-delay: 1s;
  }
  div:last-child {
    animation-delay: 1.2s;
  }
`;

const Tags = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  padding: 10px 15px;
  margin-top: 10px;
  border-radius: 10px;
  animation: ${delayAnimation} 0.5s ease-in-out;
  &:first-child {
    margin-top: 30px;
  }
`;

const TagTitle = styled.span`
  font-size: 16px;
`;
const TagContent = styled.span<{ isMinus: boolean }>`
  color: ${(props) => (props.isMinus ? "lightgreen" : "orange")};
  font-size: 18px;
`;

export default Price;
