import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react'
import { RefreshControl, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NewHomeStackParamList } from './NewHomeParamList';
import { Timetable } from './Timetable';
type PostProps = {
    navigation:StackNavigationProp<NewHomeStackParamList, "Home">
 }
const Post: React.FC<PostProps> = ({ }) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 2000);
    }, []);
    return (
        <ScrollView 
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <Timetable refreshing={refreshing} setRefreshing={setRefreshing}  />
        </ScrollView>
    )
};

export default Post;