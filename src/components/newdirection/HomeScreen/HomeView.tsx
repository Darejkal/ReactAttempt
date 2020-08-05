import React, { useRef, useEffect, useContext, useState } from 'react'
import { View, ScrollView, Text, Image, RefreshControl } from 'react-native';
import { Timetable } from './Timetable';
import NewsFeed from './NewsFeed';
type HomeViewProps = {}
export const HomeView: React.FC<HomeViewProps> = ({ }) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 2000);
    }, []);
    return (
        <View style={{ flex: 1, paddingTop: 10, paddingBottom: 10 }}>
            <ScrollView
                style={{ flex: 1, padding: 10 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <Timetable refreshing={refreshing} />
                <View style={{ paddingTop: 10 }}>
                    <NewsFeed refreshing={refreshing} />
                </View>
            </ScrollView>
        </View>
    )
};

export default HomeView;