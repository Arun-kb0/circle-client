import { ResponsivePie } from '@nivo/pie'

// Define a dark theme for the Pie Chart
const darkTheme = {
  background: 'transparent', // Keep background transparent to let the parent dark bg show
  textColor: '#ffffff',      // Global text color is white
  tooltip: {
    container: {
      background: '#333333', // Dark tooltip background
      color: '#ffffff',      // Tooltip text color is white
    },
  },
  labels: {
    text: {
      fill: '#ffffff',       // Arc labels text color is white
    },
  },
  legends: {
    text: {
      fill: '#ffffff',       // Legends text color is white
    },
  },
}

type Props = {
  data: any
}

const PieChart = ({ data }: Props) => (
  <ResponsivePie
    data={data}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    borderColor={{
      from: 'color',
      modifiers: [['darker', 0.2]],
    }}
    arcLinkLabelsSkipAngle={10}
    // Updated to use white text for arc link labels
    arcLinkLabelsTextColor="#ffffff"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: 'color' }}
    arcLabelsSkipAngle={10}
    // Updated arc labels to white; removes the darker modifier so theme color applies directly
    arcLabelsTextColor="#ffffff"
    defs={[
      {
        id: 'dots',
        type: 'patternDots',
        background: 'inherit',
        color: 'rgba(255, 255, 255, 0.3)',
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: 'lines',
        type: 'patternLines',
        background: 'inherit',
        color: 'rgba(255, 255, 255, 0.3)',
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    fill={[
      { match: { id: 'ruby' }, id: 'dots' },
      { match: { id: 'c' }, id: 'dots' },
      { match: { id: 'go' }, id: 'dots' },
      { match: { id: 'python' }, id: 'dots' },
      { match: { id: 'scala' }, id: 'lines' },
      { match: { id: 'lisp' }, id: 'lines' },
      { match: { id: 'elixir' }, id: 'lines' },
      { match: { id: 'javascript' }, id: 'lines' },
    ]}
    legends={[
      {
        anchor: 'bottom',
        direction: 'row',
        justify: false,
        translateX: 0,
        translateY: 56,
        itemsSpacing: 0,
        itemWidth: 100,
        itemHeight: 18,
        // Updated legend text color to white to match dark theme
        itemTextColor: '#ffffff',
        itemDirection: 'left-to-right',
        itemOpacity: 1,
        symbolSize: 18,
        symbolShape: 'circle',
        effects: [
          {
            on: 'hover',
            style: {
              // Ensure hover style also uses white text
              itemTextColor: '#ffffff',
            },
          },
        ],
      },
    ]}
    theme={darkTheme} // Apply the dark theme settings
  />
)

export default PieChart
