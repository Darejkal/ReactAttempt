import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { View,Text } from 'react-native'
import { Table, Row, Rows, Col, TableWrapper } from 'react-native-table-component';
interface Timetable2Props {
    tableHead: string[];
    tableColumnHead: string[];
    tableData: string[];
}
export interface TimetableData {
    classID: string;
    schoolID: string;
    Mon: string | null;
    Tue: string | null;
    Wed: string | null;
    Thu: string | null;
    Fri: string | null;
    Sat: string | null;
    Sun: string | null;
 //   calendar: Calendar; -> old mongodb
}
interface Calendar {
    Mon: string | null;
    Tue: string | null;
    Wed: string | null;
    Thu: string | null;
    Fri: string | null;
    Sat: string | null;
    Sun: string | null;
}

export const Timetable2: React.FC<Timetable2Props> = ({ tableHead, tableColumnHead, tableData }) => {
    const [splitedTableData,setSplitedTableData]=useState([]);
    useEffect( ()=>{
        let arr:string[][]=[]
        tableData.forEach((i)=>{arr.push(i.split(" "))})
        //@ts-ignore
        setSplitedTableData(arr)
        console.log("arr is HERRRRRRRRRRRRRRRRRRE")
        console.log(arr)
    },[])
    return (

        (
            <View
                style={{ flex: 1, backgroundColor: '#fff', paddingTop: 30,paddingBottom:30, padding: 10 }}
            // horizontal={true}
            >
                <Table
                    borderStyle={{ borderWidth: 1, borderColor: "#34495e" }}
                //'#c8e1ff'
                >
                    <Row data={tableHead} flexArr={[1, 2]} style={{ backgroundColor: '#95a5a6', height: 40 }} textStyle={{ textAlign: 'center' }} />
                    <TableWrapper style={{ flexDirection: 'row' }}>
                        <Col data={tableColumnHead}  style={{ backgroundColor: '#ecf0f1', flex: 2.5 }} textStyle={{ textAlign: "center" }} />
                        <Rows data={splitedTableData} style={{ height: 50 }} flexArr={[1,1,1,1,1]} textStyle={{ textAlign: 'center' }} />
                    </TableWrapper>
                </Table>
            </View>
            // <Text>Yo</Text>
        )
    )
}

