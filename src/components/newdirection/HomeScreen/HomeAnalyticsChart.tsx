import React from 'react'
import { Dimensions, Platform, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { ScrollView } from 'react-native-gesture-handler';
type HomeAnalyticsChartProps = { 
}
const dimensions=Dimensions.get('window');
export const HomeAnalyticsChart: React.FC<HomeAnalyticsChartProps> = ({ }) => {

    return (
    <View style={{alignItems:"center",justifyContent:"center"}}>
    <LineChart
    data={{
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [{
        data: [
            60,58,60,59,59,60
        ]
      }]
    }}
    width={dimensions.width*0.95} // from react-native
    height={220}
    yAxisLabel={''}
    chartConfig={{
      backgroundColor: '#3b5249',
      backgroundGradientFrom: '#3b5249',
      backgroundGradientTo: '#ffa726',
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
  </View>
    )
};

export default HomeAnalyticsChart;