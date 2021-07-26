import React from 'react'
import { DataTable } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { useEffect } from 'react';

interface TimetableProps {
  tableHead: string[];
  tableColumnHead: string[];
  tableData: string[];
}

export const Timetable1: React.FC<TimetableProps> = ({ tableColumnHead, tableData }) => {
  useEffect(()=>{
    console.log("context from timetable1---------------------------")
    console.log(tableColumnHead)
    console.log(tableData)
  },[])
  return (
    <View style={{ flex: 1 }}>
      {tableColumnHead.map((day) => (
       <DataTable key={day} style={{ aspectRatio: 3.1 }}>
        {/* @ts-ignore */}
          <DataTable.Header >
             {/* @ts-ignore */}
            <DataTable.Title style={{backgroundColor:""}}>{day}</DataTable.Title>
          </DataTable.Header>
          <ScrollView horizontal={true}>
             {/* @ts-ignore */}
            <DataTable.Row>
               {/* @ts-ignore */}
              <DataTable.Cell>{tableData[tableColumnHead.indexOf(day)]}</DataTable.Cell>
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