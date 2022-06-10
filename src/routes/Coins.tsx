import styled from "styled-components";
import Helmet from "react-helmet";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  //useQuery hook fetcher 함수를 불러온다.
  //fetcher함수가 loading 중이면 react query는 알려준다.
  //fetcher 불러오는게 끝나면 json을  data에 넣어준다.
  // loading 안 보이는 이유 데이터를 캐시에 저장
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

  const isDark = useRecoilValue(isDarkAtom);
  const isDarkSet = useSetRecoilState(isDarkAtom);
  const toggleDark = () => isDarkSet((current) => !current);

  return (
    <Container>
      <Helmet>
        <title>COIN</title>
      </Helmet>
      <Header>
        <div style={{ width: "20px" }}></div>
        <Title>CRYPTO TRACKER</Title>
        <ToggleBtn onClick={toggleDark}>{isDark ? "🔅" : "🌙"}</ToggleBtn>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 20).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <span className="rank">{coin.rank}</span>
                <Image
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  alt={coin.name}
                />
                <span className="symbol">{coin.symbol}</span>
                <span className="name">({coin.name})</span>
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

const Container = styled.div`
  max-width: 480px;
  padding: 0px 20px;
  margin: 32px auto;
`;
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 28px;
  color: ${(props) => props.theme.textColor};
`;

const ToggleBtn = styled.button`
  border: none;
  background-color: transparent;
  font-size: 20px;
`;

const CoinList = styled.ul`
  width: 100%;
`;

const Coin = styled.li`
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 15px;
  font-size: 28px;
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  a {
    display: flex;
    align-items: center;
    .name {
      font-size: 20px;
    }
  }
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

const Image = styled.img`
  width: 30px;
  height: 30px;
  margin: 0 10px;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

export default Coins;
