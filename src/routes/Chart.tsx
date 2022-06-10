import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { readBuilderProgram } from "typescript";

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  const mappedOhlcvData = data?.map((data: IHistorical) => ({
    x: data.time_open,
    y: [
      data.open.toFixed(2),
      data.high.toFixed(2),
      data.low.toFixed(2),
      data.close.toFixed(2),
    ],
  }));
  return (
    <div style={{ fontSize: "40px", color: "red" }}>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart //
          type="candlestick"
          series={[{ data: mappedOhlcvData }] as unknown as number[]}
          options={{
            theme: {
              monochrome: {
                enabled: true,
                color: "#255aee",
                shadeTo: "light",
                shadeIntensity: 0.65,
              },
            },
            chart: {
              type: "candlestick",
              height: 350,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },

            stroke: {
              curve: "smooth",
              width: 2,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              type: "datetime",
              // categories: data?.map((price) => price.time_close),
              labels: {
                style: {
                  colors: "black",
                },
              },
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#3C90EB",
                  downward: "#DF7D46",
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}

// <ApexChart
//           type="line"
//           series={[
//             {
//               name: "price",
//               data: data?.map((price) => price.close) ?? [],

//               // number 배열임을 강제로 알려준다. (또 다른 방식)
//               // data: data?.map((price) => price.close) as number[],
//             },
//           ]}
//           options={{
//             theme: {
//               mode: "dark",
//             },
//             chart: {
//               height: 500,
//               width: 500,
//               toolbar: {
//                 show: false,
//               },
//               background: "transparent",
//             },
//             stroke: {
//               curve: "smooth",
//               width: 3,
//             },
//             yaxis: {
//               labels: {
//                 show: false,
//                 formatter: function (value) {
//                   return `$${value.toFixed(3)}`;
//                 },
//               },
//             },
//             xaxis: {
//               labels: {
//                 show: false,
//               },
//               axisBorder: { show: false },
//               axisTicks: {
//                 show: false,
//               },
//               categories: data?.map((price) => price.time_close),
//               type: "datetime",
//             },
//             fill: {
//               type: "gradient",
//               gradient: { gradientToColors: ["yellow"], stops: [0, 100] },
//             },
//             colors: ["green"],
//             grid: {
//               show: false,
//             },
//           }}
//         />

export default Chart;
