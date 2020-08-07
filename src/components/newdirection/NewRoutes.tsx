import React, { useState, useEffect, useContext, useRef, useCallback } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {  ActivityIndicator } from 'react-native';
import { NewAuthContext } from './NewAuthProvider';
import { asyncStorageGetStoredData } from '../AsyncShortcut';
import { TimetableData } from './HomeScreen/Timetable2';
import { TIMETABLE_KEY } from '../KEYS';
import { Center } from '../Center';
import { NewAppTabs } from './HomeScreen/NewAppTabs';
import {NewLogin} from './NewLogin'
import { prepareSettings } from '../Preferences';
import { prepareLanguage } from '../Language';
interface NewRoutesProps {

}
export const NewRoutes: React.FC<NewRoutesProps> = ({ }) => {
    const { data, setData } = useContext(NewAuthContext);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
    const componentDidMount= async()=>{
    const done1 = await asyncStorageGetStoredData<TimetableData|null>(TIMETABLE_KEY).then((data)=>{
        setData(data);
       console.log("data: "+ data);
       return true
    }).finally(()=>{
        console.log("ended getting stored data")
        return true
    })
    const done2 = await prepareSettings().then(
        ()=>{
            return true
        }
    )
    const done3 = await prepareLanguage().then(
        ()=>{
            return true
        }
    )
    return done1&&done2&&done3
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
            {data ? <NewAppTabs /> : <NewLogin showLoading={(load:boolean)=>setLoading(load)} />}
        </NavigationContainer>
    );
}