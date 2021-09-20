import React, { useRef, useEffect, useContext, useState, useCallback } from 'react'
import { View, Text, Image, RefreshControl, Pressable, Keyboard, Dimensions } from 'react-native';
import {ScrollView} from "react-native-gesture-handler"
import { Timetable } from './Timetable';
import NewsFeed, { NewsPostingForm } from './NewsFeed';
import { StackNavigationProp } from '@react-navigation/stack';
import { NewHomeStackParamList } from './NewHomeParamList';
import { TimedNews } from './NewsFeedEngine';
import HomeAnalyticsChart from './HomeAnalyticsChart';
import HomePoll from './HomePoll';
type HomeViewProps = {
    navigation:StackNavigationProp<NewHomeStackParamList, "Home">
}
const scrHeight = Dimensions.get("window").height
export const HomeView: React.FC<HomeViewProps> = ({navigation }) => {
    const [refreshing, setRefreshing] = useState(false);
    const [refreshingTimetable, setRefreshingTimetable] = React.useState(false);
    const [refreshingPost, setRefreshingPost] = React.useState(false);
    const [opacity, setOpacity] = useState(1);
    const [scollable, setScollable] = useState(true);
    const _postingCoordinate = useRef({x:0,y:0});
    const _scrollViewRef:any = useRef();
    const [privateNewsArr, setPrivateNewsArr] = useState<TimedNews[]>([]);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setRefreshingTimetable(true);
        setRefreshingPost(true);
        //setTimeout(() => setRefreshing(false), 2000);
    }, []);
    const savePostingLocation = (x:number,y:number)=>{
        _postingCoordinate.current.x =x
        _postingCoordinate.current.y =y
    };
    useEffect(()=>{
        if(!refreshingTimetable&&!refreshingPost) setRefreshing(false); 
    })
    useEffect(()=>{
        if(opacity<1) {
            setScollable(false);
            //@ts-ignore
            _scrollViewRef.current.scrollTo({animated:true,..._postingCoordinate.current});
            Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
        }
        else setScollable(true);
        return ()=>{
            Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
        }
    },[opacity])
    
      const _keyboardDidHide = () => {
        if(opacity<1)setOpacity(1);
      };
    return (
        <View style={{ flex: 1, paddingTop: 10 }}>
            <ScrollView
                keyboardShouldPersistTaps={"handled"}
                ref={(ref)=>_scrollViewRef.current=ref}
                nestedScrollEnabled={true}
                scrollEnabled={scollable}
                style={{ flex: 1, padding: 10, }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                
            >
                <View 
                onLayout={() => {}} 
                collapsable={false}
                style={{ paddingBottom: Math.max(scrHeight*0.1,90)}}
                >
                <Pressable style={{opacity:opacity,marginBottom:10}} onPress={()=>{if(opacity<1)setOpacity(1)}}>
                <Timetable refreshing={refreshingTimetable} setRefreshing={setRefreshingTimetable} navigation={navigation}  opacity={opacity}  />
                </Pressable>
                <NewsPostingForm
                    setPrivateNewsArr={setPrivateNewsArr}
                    privateNewsArr={privateNewsArr}
                 setParentOpacity={setOpacity} parentOpacity={opacity} savePostingLocation={savePostingLocation} />
                <Pressable style={{ paddingTop: 10,opacity:opacity }} onPress={()=>{if(opacity<1)setOpacity(1) }}>
                <HomeAnalyticsChart/>
                <HomePoll/>
                    <NewsFeed 
                    setPrivateNewsArr={setPrivateNewsArr}
                    privateNewsArr={privateNewsArr}
                    refreshing={refreshingPost} 
                    setRefreshing={setRefreshingPost}
                    navigation={navigation} />
                </Pressable>
                </View>
            </ScrollView>
        </View>
    )
};

export default HomeView;