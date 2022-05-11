// 1. button => a 태그로 변경
// const Btn = styled.button``;
// <Btn as="a" href="/">Login</Btn>

// 2. 태그에 property 추가
// const Input = styled.input.attrs({ required: true})``;

// 3. 타켓팅
// const Emoji = styled.span``; // const BOx = styled.div`
// ${Emoji} {
// &:hover {
// color: red;
// }
// }
// `;

// 4. props interface 정의
// { bgColor}: CircleProps
// <Container bgColor={bgColor} />

// styled component props는 다시 한 번 정의 해줘야 된다.
// interface ContainerProps {
// bgColor: string;
// }
// const Container = styled.div<ContainerProps>``;

// props: CircleProps
// <Container bgColor={props.bgColor} />

// 5. interface 예시
// interface PlayerShaep {
// name: string;
// age: string;
// }
// const sayHello = (playerObj:PlayerShape) => `Hello ${playerObj.name}`

// interface 코드 실행 전 오류 확인
// Prop Types 코드 실행 후 오류 확인

optional type error, borderColor={borderColor ?? bgColor} default 값 지정 가능

function Circle({ bgColor, borderColor, text="default text" }: CircleProps)
// optional default value

// type 지정
const [value, setValue] = useState<number | string>(0);

// if typescript 오류, npm i --save-dev @types/styled-component

const onChange = (event: React.FormEvent<HTMLInputElement>) => {
setValue(event.currentTarget.value);

or

const {
currentTarget: { value },
} = event;
setValue(value);

};

d.ts = declaration file

1. type 정의
   const { coinId } = useParams<{ coinId: string }>();
