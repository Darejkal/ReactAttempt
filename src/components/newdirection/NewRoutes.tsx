import React, { useState, useEffect, useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {  ActivityIndicator } from 'react-native';
import { NewAuthContext } from './NewAuthProvider';
import { asyncStorageGetStoredData } from '../AsyncShortcut';
import { TimetableData } from './HomeScreen/Timetable2';
import { TIMETABLE_KEY } from '../KEYS';
import { Center } from '../Center';
import { NewAppTabs } from './HomeScreen/NewAppTabs';
import {NewLogin} from './NewLogin'
interface NewRoutesProps {

}
export const NewRoutes: React.FC<NewRoutesProps> = ({ }) => {
    const { data, setData } = useContext(NewAuthContext);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
    asyncStorageGetStoredData<TimetableData|null>(TIMETABLE_KEY).then((data)=>{
        setData(data);
       console.log("data: "+ data);
    }).finally(()=>{
        setLoading(false);
        console.log("ended getting stored data")
    })
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