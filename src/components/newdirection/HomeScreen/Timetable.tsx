import React, { useState, useContext, useEffect, useRef } from 'react'
import { Timetable1 } from './Timetable1';
import { Timetable2, TimetableData } from './Timetable2';
import { Text, View, ActivityIndicator, ScrollView, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NewAuthContext } from '../NewAuthProvider';
import { Center } from '../../Center';
import { TIMETABLE_KEY } from '../../KEYS';
import I18n, { t } from 'i18n-js';
import { arr_DAY_OF_THE_WEEK } from '../../Language';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { NewHomeStackParamList } from './NewHomeParamList';
interface TimetableProps {
    refreshing: boolean,
    navigation?: StackNavigationProp<NewHomeStackParamList, "Home">
}
async function getTimetableData(classID: string): Promise<TimetableData | null> {
    try {
        //FIXME:
        const response = await fetch(
            "https://y2lnrwnc98.execute-api.ap-southeast-1.amazonaws.com/TestStage1/access/info/" + classID + "/timetable"
        );
        console.log("HEY, async!!!!");
        if (response.ok) {
            console.log("respone ok")
            // console.log(response)
            const body = await response.json();
            console.log("JSON: body  " + body)
            return new Promise((resolve) => { resolve(body.Item) })
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

export const Timetable: React.FC<TimetableProps> = ({ refreshing, navigation }) => {
    //loading and stuffs
    const _isMounted = useRef(true)
    console.log("timetable executed")
    const [TableHead, setTableHead] = useState([I18n.t("timetableHead1"), I18n.t("timetableHead2")])
    const [TableColumnHead, setTableColumnHead] = useState([I18n.t("error")]);
    const [TableData, setTableData] = useState(["104"]);
    const [done, setDone] = useState(-1);
    const { data } = useContext(NewAuthContext);
    console.log("DATA" + data)
    console.log("DATA" + JSON.stringify(data))
    const prepareTimetable = (timetableData: TimetableData) => {
        // let temp1: string[] = [];
        let temp2: string[] = [...arr_DAY_OF_THE_WEEK];
        for (const [key, value] of Object.entries(timetableData)) {
            console.log("validate: " + key + " " + value);
            if (key === "classID" || key === "schoolID") continue
            // temp1.push(key);
            // console.log("temp1:" + temp1)
            console.log("IMMMMMMMMMMMMMMMMMMMMMMMMMM WHAT YOU WANTTTTTTT")
            console.log(value)
            temp2[temp2.indexOf(key)]=value;
            console.log(temp2)
        }
        // throw new Error("error")
        if (_isMounted.current) {
            setTableColumnHead(arr_DAY_OF_THE_WEEK);
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
    useEffect(() => {
        prepareTimetable(data!)
        setDone(0)
        // getTimetableOnline(data!.classID)
        return () => { _isMounted.current = false }
    }, [])
    useEffect(() => {
        if (done === 1) {
            setTimeout(getTimetableOnline(data!.classID), 10000)
        }
        if (refreshing) {
            getTimetableOnline(data!.classID)
        }
    })

    //Choose Timetable
    //TODO
    //save isEnabled in storage
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    let tableStyle: React.ReactNode;
    if (done < 0) {
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
                <Text style={{ padding: 10, fontSize: 15 }}>{I18n.t("tableHeading")} :</Text>
                <Text style={{ paddingTop: 10, paddingBottom: 10, fontSize: 15, marginLeft: "auto", marginRight: 5 }}>{I18n.t("viewAsList")}</Text>
                <Switch
                    style={{ position: 'relative', right: 5 }}
                    trackColor={{ false: "#7f8c8d", true: "#6edc5f" }}
                    thumbColor={"#fff"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
            <TouchableOpacity
                onPress={() => {
                    navigation?.navigate("FocusedPost", {
                        heading: "",
                        detail: "",
                        children: tableStyle
                    })
                }}>{tableStyle}</TouchableOpacity>
        </View>


    );
}
