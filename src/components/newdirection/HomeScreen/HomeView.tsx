import React from 'react'
import { View,ScrollView, Text,Image } from 'react-native';
import { Timetable } from './Timetable';
import NewsFeed from './NewsFeed';
type HomeViewProps = { }
export const HomeView: React.FC<HomeViewProps> = ({ }) => {
    return (
        <View style={{ flex: 1, paddingTop: 10, paddingBottom: 10 }}>
            <ScrollView style={{ flex: 1, padding: 10 }}>
            <Timetable/>
            <View style={{ paddingTop: 10 }}>
                    <NewsFeed/>
            </View>

            </ScrollView>
        </View>
    )
};

export default HomeView;