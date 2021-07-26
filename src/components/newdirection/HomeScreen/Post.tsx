import React from 'react'
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Timetable } from './Timetable';
type PostProps = { }
export const Post: React.FC<PostProps> = ({ }) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 2000);
    }, []);
    return (
        <ScrollView>
            <Timetable refreshing={refreshing}  />
        </ScrollView>
    )
};

export default Post;