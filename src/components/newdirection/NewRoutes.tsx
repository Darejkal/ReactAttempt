import React, { useState, useEffect, useContext, useRef, useCallback } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {  ActivityIndicator } from 'react-native';
import { NewAuthContext, NewUserData } from './NewAuthProvider';
import { asyncStorageGetStoredData } from '../AsyncShortcut';
import { TimetableData } from './HomeScreen/Timetable2';
import { TIMETABLE_KEY, USER_KEY } from '../KEYS';
import { Center } from '../Center';
import { NewAppTabs } from './HomeScreen/NewAppTabs';
import {NewLogin} from './NewLogin'
import { prepareSettings } from '../Preferences';
import { prepareLanguage } from '../Language';
interface NewRoutesProps {

}
export const NewRoutes: React.FC<NewRoutesProps> = ({ }) => {
    const {data,userData,setData,setUserData } = useContext(NewAuthContext);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
    const componentDidMount= async()=>{
    await asyncStorageGetStoredData<TimetableData|null>(TIMETABLE_KEY).then((data)=>{
        setData(data);
    }).finally(()=>{
        console.log("ended getting stored data")
    })
    await asyncStorageGetStoredData<NewUserData>(USER_KEY).then((data)=>{
        setUserData(data);
    }).finally(()=>{
        console.log("ended getting stored data2")
    })
    await prepareSettings()
    await prepareLanguage()
}
    componentDidMount().then(
        ()=>setLoading(false)
    )
}, [])
    if (loading) {
        console.log("load");
        return (
            <Center>
                <ActivityIndicator size="large" />
            </Center>
        )
    }
    return (
        <NavigationContainer>
            {data&&userData ? <NewAppTabs /> : <NewLogin showLoading={(load:boolean)=>setLoading(load)} />}
        </NavigationContainer>
    );
}