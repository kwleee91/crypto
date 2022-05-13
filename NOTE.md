1. button => a 태그로 변경
   const Btn = styled.button``;
   <Btn as="a" href="/">Login</Btn>

2. 태그에 property 추가
   const Input = styled.input.attrs({ required: true})``;

3. 타켓팅
   const Emoji = styled.span``; // const Box = styled.div`
   ${Emoji} {
   &:hover {
   color: red;
   }
   }
   `;
4. props interface 정의
   { bgColor}: CircleProps
   <Container bgColor={bgColor} />
   styled component props는 다시 한 번 정의 해줘야 된다.
   interface ContainerProps {
   bgColor: string;
   }
   const Container = styled.div<ContainerProps>``;
   props: CircleProps
   <Container bgColor={props.bgColor} />

5. interface 예시
   interface PlayerShaep {
   name: string;
   age: string;
   }
   const sayHello = (playerObj:PlayerShape) => `Hello ${playerObj.name}`

6. interface 코드 실행 전 오류 확인
   Prop Types 코드 실행 후 오류 확인

7. optional type error, borderColor={borderColor ?? bgColor} default 값 지정 가능

8. optional default value
   function Circle({ bgColor, borderColor, text="default text" }: CircleProps)

9. type 지정
   const [value, setValue] = useState<number | string>(0);

10. if typescript 오류, npm i --save-dev @types/styled-component

11. const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);

or

const {
currentTarget: { value },
} = event;
setValue(value);
};

12. d.ts = declaration file

13. type 정의
    const { coinId } = useParams<{ coinId: string }>();

14. 기본값 제거, 글꼴 import
    const GlobalStyle = createGlobalStyle`@import url('https://fonts.googleapis.com/css2?family=Open+Sans&family=Source+Sans+Pro:ital,wght@0,300;1,400&display=swap');

- {
  box-sizing: border-box;
  }
  body {
  font-family: 'Source Sans Pro', sans-serif;
  }
  a {
  text-decoration: none;
  color: inherit;
  }
  `;

15. right arrow
    &rarr;

a href : 페이지 새로고침 됨.

16. map data type 정의
    const [coins, setCoins] = useState<CoinInterface[]>([]);

17. useEffect : 특정한 시기에 코드를 실행

18. data fetch
    useEffect(() => {
    (async () => {
    const response = await fetch("https://api.coinpaprika.com/v1/coins");
    const json = await response.json();
    setCoins(json.slice(0, 20));
    setLoading(false);
    })();
    }, []);
