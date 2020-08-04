import React from 'react'
import { DataTable } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from 'react-native';

interface TimetableProps {
  tableHead: string[];
  tableColumnHead: string[];
  tableData: string[][];
}

export const Timetable1: React.FC<TimetableProps> = ({ tableColumnHead, tableData }) => {
  return (
    <View style={{ flex: 1 }}>
      {tableColumnHead.map((day) => (
       <DataTable key={day} style={{ aspectRatio: 3.1 }}>
        {/* @ts-ignore */}
          <DataTable.Header >
             {/* @ts-ignore */}
            <DataTable.Title>{day}</DataTable.Title>
          </DataTable.Header>
          <ScrollView horizontal={true}>
             {/* @ts-ignore */}
            <DataTable.Row>
               {/* @ts-ignore */}
              <DataTable.Cell>{tableData[tableColumnHead.indexOf(day)][0]}</DataTable.Cell>
            </DataTable.Row>
          </ScrollView>
        </DataTable>)
      )
      }
    </View>)

}
const text = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
}