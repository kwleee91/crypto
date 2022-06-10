import styled from "styled-components";
import Helmet from "react-helmet";
import { useParams, Routes, Route, useMatch } from "react-router";
import { Link, useLocation } from "react-router-dom";
import Chart from "./Chart";
import Price from "./Price";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

interface ILocation {
  state: {
    name: string;
  };
}

interface ITag {
  coin_counter: number;
  ico_counter: number;
  id: string;
  name: string;
}

// right mouse click global variable temp1 생성
// Object.keys(temp1).join()  key 값 생성
// Object.value(temp1).map(v => typeof v).join()  value type 값 생성
// key array 일 경우 ITag[]; 입력 후 interface 생성

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  contract: string;
  platform: string;
  contracts: object;
  parent: object;
  tags: ITag[];
  team: object;
  description: string;
  message: string;
  open_source: boolean;
  started_at: object;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: object;
  links_extended: object;
  whitepaper: object;
  first_data_at: string;
  last_data_at: string;
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

function Coin() {
  const { coinId } = useParams() as { coinId: string };
  const { state } = useLocation() as ILocation;
  // <RouteParams>

  //useMatch 특정한 위치에 있는지 여부를 알려준다.
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId!),
    {
      refetchInterval: 5000,
    }
  );
  // const [info, setInfo] = useState<InfoData>();
  // const [priceInfo, setPriceInfo] = useState<PriceData>();
  // const [loading, setLoading] = useState(true);

  // 즉시 실행될 function
  // useEffect(() => {
  //   (async () => {
  //     const infoData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //     ).json();
  //     const priceData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //     ).json();
  //     setInfo(infoData);
  //     setPriceInfo(priceData);
  //     setLoading(false);
  //   })();
  // }, [coinId]);

  const loading = infoLoading || tickersLoading;

  const isDark = useRecoilValue(isDarkAtom);
  const isDarkSet = useSetRecoilState(isDarkAtom);
  const toggleDark = () => isDarkSet((current) => !current);
  return (
    <Container>
      {/* head 로 가는 direct link */}
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Link to="/">
          <ImgWrapper>◀</ImgWrapper>
        </Link>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
        <ToggleBtn onClick={toggleDark}>{isDark ? "🔅" : "🌙"}</ToggleBtn>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{`$${tickersData?.quotes.USD.price}`}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Routes>
            <Route path="price" element={<Price coinId={coinId} />} />
            <Route path="chart" element={<Chart coinId={coinId} />} />
          </Routes>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    width: 50px;
    height: 43px;
  }
`;

const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
`;

const Title = styled.h1`
  font-size: 38px;
  color: ${(props) => props.theme.textColor};
`;

const ToggleBtn = styled.button`
  border: none;
  background-color: transparent;
  font-size: 20px;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) => (props.isActive ? "orange" : props.theme.textColor)};
  a {
    display: block;
  }
`;

export default Coin;
