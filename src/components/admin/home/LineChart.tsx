import { ResponsiveLine } from '@nivo/line'
import { LineChartDataType } from '../../../constants/types'

type Props = {
  data: LineChartDataType[]
}

const darkTheme = {
  background: 'transparent',
  textColor: '#ffffff',
  fontSize: 12,
  axis: {
    domain: {
      line: {
        stroke: '#777777',
        strokeWidth: 1,
      },
    },
    legend: {
      text: {
        fill: '#ffffff',
        fontSize: 12,
      },
    },
    ticks: {
      line: {
        stroke: '#777777',
        strokeWidth: 1,
      },
      text: {
        fill: '#ffffff',
      },
    },
  },
  grid: {
    line: {
      stroke: '#444444',
      strokeWidth: 1,
    },
  },
  legends: {
    text: {
      fill: '#ffffff',
    },
  },
  tooltip: {
    container: {
      background: '#333333',
      color: '#ffffff',
      fontSize: 12,
    },
  },
}

const LineChart = ({ data }: Props) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{
      type: 'time',
      format: '%Y-%m-%d',
      precision: 'month'
    }}
    yScale={{
      type: 'linear',
      min: 'auto',
      max: 'auto',
      stacked: true,
      reverse: false
    }}
    xFormat="time:%b"
    yFormat=" >-.2f"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Month',
      legendOffset: 36,
      legendPosition: 'middle',
      truncateTickAt: 0,
      format: '%b'
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'count',
      legendOffset: -40,
      legendPosition: 'middle',
      truncateTickAt: 0
    }}
    pointSize={10}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabel="data.yFormatted"
    pointLabelYOffset={-12}
    enableTouchCrosshair={true}
    useMesh={true}
    legends={[
      {
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: 'left-to-right',
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: 'circle',
        symbolBorderColor: 'rgba(0, 0, 0, .5)',
        effects: [
          {
            on: 'hover',
            style: {
              itemBackground: 'rgba(0, 0, 0, .03)',
              itemOpacity: 1
            }
          }
        ]
      }
    ]}
    theme={darkTheme}
  />
)

export default LineChart