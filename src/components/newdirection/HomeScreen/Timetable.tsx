import React, { useState, useContext, useEffect, useRef } from 'react'
import { Timetable1 } from './Timetable1';
import { Timetable2, TimetableData } from './Timetable2';
import { Switch } from 'react-native-paper';
import { Text, View, ActivityIndicator, ScrollView, AsyncStorage } from 'react-native';
import { NewAuthContext } from '../NewAuthProvider';
import { Center } from '../../Center';
import { TIMETABLE_KEY } from '../../KEYS';
import { asyncStorageGetStoredData } from '../../AsyncShortcut';
import { createTwoButtonAlert } from '../../Alerts';
interface TimetableProps {

}
async function getTimetableData(classID: string): Promise<TimetableData | null> {
    try {
        const response = await fetch(
            "https://schoolproject213.herokuapp.com/data/findTimetable/" + classID
        );
        //   console.log("HEY, async!!!!");
        if (response.ok) {
            console.log("respone ok")
            // console.log(response)
            const body = await response.json();
            console.log("JSON: body  " + body)
            return new Promise((resolve) => { resolve(body) })
        } else {
            // createTwoButtonAlert("Error loading data","Error 106")
            throw new Error(response.statusText);
        }

    } catch (e) {
        //   console.error(e);
        console.log("error console logged!")
        return new Promise((reject) => { reject(null) });
    }
}

export const Timetable: React.FC<TimetableProps> = ({ }) => {
    //loading and stuffs
    const _isMounted=useRef(true)
    console.log("timetable executed")
    const [TableHead, setTableHead] = useState(["Day", "Lesson"])
    const [TableColumnHead, setTableColumnHead] = useState(["Error"]);
    const [TableData, setTableData] = useState([["104"]]);
    const [done, setDone] = useState(-1);
    const { data } = useContext(NewAuthContext);
    const prepareTimetable = (timetableData: TimetableData) => {
        let temp1: string[] = [];
        let temp2: string[][] = [];
        for (const [key, value] of Object.entries(timetableData!.calendar)) {
            console.log(key + " " + value);
            let day = " ";
            switch (key) {
                case "Mon":
                    day = text.Mon;
                    break;
                case "Tue":
                    day = text.Tue;
                    break;
                case "Wed":
                    day = text.Wed;
                    break;
                case "Thu":
                    day = text.Thu;
                    break;
                case "Fri":
                    day = text.Fri;
                    break;
                case "Sat":
                    day = text.Sat;
                    break;
                case "Sun":
                    day = text.Sun;
                    break;
                default:
                    day = "Error 101";
                    break;
            }
            //TODO:
            //REGEX?
            temp1.push(day);
            temp2.push([value]);
        }
        if(_isMounted.current){
            setTableColumnHead(temp1);
            setTableData(temp2);
        }
    }
    const getTimetableOnline = (classID: string) => {
        getTimetableData(classID)
            .then((timetableData) => {
                if (!timetableData) throw ("TIMETABLE IS NULL");
                AsyncStorage.setItem(TIMETABLE_KEY, JSON.stringify(timetableData));
                prepareTimetable(timetableData)
                setDone(2)
            }).catch((e) => {
                console.log(e);
                // createTwoButtonAlert("Error loading data","Error 108")
                setDone(1)
            })
    }
    //load Timetable:
    useEffect(()=>{
        prepareTimetable(data!)
        setDone(0)
        getTimetableOnline(data!.classID)
        return ()=>{_isMounted.current=false}
    },[])
    useEffect(()=>{
        if(done===1) {
            setTimeout(getTimetableOnline(data!.classID),10000)
        }
    })

    //Choose Timetable
    //TODO
    //save isEnabled in storage
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    let tableStyle;
    if (done<0) {
        tableStyle = (
            <Center>
                <ActivityIndicator size="large" />
            </Center>)
    } else if (isEnabled) {
        tableStyle = <Timetable1 tableHead={TableHead} tableColumnHead={TableColumnHead} tableData={TableData} />;
    } else {
        tableStyle = <Timetable2 tableHead={TableHead} tableColumnHead={TableColumnHead} tableData={TableData} />
    }
    return (
            <View>
                <View style={{ flexDirection: 'row', backgroundColor: "#bdc3c7" }}>
                    <Text style={{ padding: 10, fontSize: 15 }}>Your timetable :</Text>
                    <Text style={{ paddingTop: 10, paddingBottom: 10, fontSize: 15, marginLeft: "auto", marginRight: 5 }}>View as list</Text>
                    <Switch
                        style={{ position: 'relative', right: 5 }}
                        trackColor={{ false: "#7f8c8d", true: "#6edc5f" }}
                        thumbColor={"#fff"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                {tableStyle}
                </View>
                

    );
}
const text = {
    Mon: 'Mon',
    Tue: 'Tue',
    Wed: 'Wed',
    Thu: "Thu",
    Fri: "Fri",
    Sat: "Sat",
    Sun: "Sun",

}