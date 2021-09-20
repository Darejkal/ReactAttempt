import React, { useState, useContext, useEffect, useRef, useCallback } from 'react'
import { View, Text, PointPropType, ActivityIndicator, FlatList, Keyboard, Pressable, Dimensions} from 'react-native';
import { NEWSFEED_KEY, NEWSFEED_HANDLER_URL } from '../../KEYS';
import { asyncStorageGetStoredData } from '../../AsyncShortcut';
import { NewAuthContext } from '../NewAuthProvider';
import { Center } from '../../Center';
import { createTwoButtonAlert } from '../../Alerts';
import { preferencesGetState } from '../../Preferences';
import { useFocusEffect } from '@react-navigation/native';
import I18n from 'i18n-js';
import { colorArr, cutDownString, dateStringFormat, duplicateFilter, fetchNews, NewsArrayHandler, postNews, sampleArray, TimedNews } from './NewsFeedEngine';
import { StackNavigationProp } from '@react-navigation/stack';
import { NewHomeStackParamList } from './NewHomeParamList';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
export type NewsFeedProps = {
    refreshing: boolean,
    setRefreshing: React.Dispatch<React.SetStateAction<boolean>>,
    navigation: StackNavigationProp<NewHomeStackParamList, "Home">,
    setPrivateNewsArr:React.Dispatch<React.SetStateAction<TimedNews[]>>,
    privateNewsArr:TimedNews[],
    // opacity: number,
    // setOpacity: React.Dispatch<React.SetStateAction<number>>
    // savePostingLocation: (x:number,y:number)=>void
}
export const NewsFeed: React.FC<NewsFeedProps> = ({ refreshing, setRefreshing, navigation,privateNewsArr,setPrivateNewsArr }) => {
    const _isMounted = useRef(true);
    const _isLoading = useRef(false);
    const [done, setDone] = useState(false);
    const { data } = useContext(NewAuthContext);
    const loadNewsFromInside = async () => {
        asyncStorageGetStoredData<TimedNews[]>(NEWSFEED_KEY).then(
            (value) => {
                if (_isMounted.current && value) {
                    setPrivateNewsArr(duplicateFilter(privateNewsArr.concat(value)))
                    setDone(true)
                }
            }).catch(error => {
                console.error(error)
            })
    }

    const loadDataOnlineFromInside = async () => {
        if (!_isLoading.current) {
            _isLoading.current = true
            fetchNews(data!.schoolID, data!.classID).then((value) => {
                // console.log("Ok2323232")
                // console.log(value)
                if (_isMounted.current) {
                    setPrivateNewsArr(duplicateFilter(privateNewsArr.concat(value)))
                    setDone(true)
                    _isLoading.current = false
                }
            }).catch(error => {
                console.error(error)
                _isLoading.current = false
            })
        }
    }

    useEffect(() => {
        if (!done) {
            async function loadThatsMeantToBeUsedLocally() {
                loadNewsFromInside()
                loadDataOnlineFromInside()
            }
            loadThatsMeantToBeUsedLocally();
        }
        _isMounted.current = true
        // AsyncStorage.removeItem(NEWSFEED_KEY).catch((error) => console.error(error))
        return () => {
            _isMounted.current = false
        }
    }, [])
    useEffect(() => {
        if (refreshing) {
            setDone(false);
            setRefreshing(false);
            loadDataOnlineFromInside();
        }
    })
    return (
        <View >
            <View>
                {
                    privateNewsArr.map((value, index) => value.classID ?
                        <NewsView value={value} key={index} />
                        : undefined
                    )
                }
                {/* {
                    privateNewsArr.map((value, index) => value.classID ? undefined :
                        <NewsView heading={value.heading} detail={value.detail} classID={value.classID} time={value.time} key={index} />
                    )
                } */}
                {done ?
                    <Center>
                        <Text style={{ padding: 10, color: "grey" }}> {I18n.t("newsFeedBottom")} </Text>
                    </Center> : undefined
                }
            </View>
            
        </View>
    )
};

const NewsView = ({ value}: { value:TimedNews,key:number}) => {
    const [color, setColor] = useState("#95a5a6")
    const [color2, setColor2] = useState("#3b5249")
    const [color3, setColor3] = useState("#519872")
    const [color4, setColor4] = useState("#D1DECE")
    const willMount = useRef(true);
    const checkColor = useCallback(() => {
        if (preferencesGetState().colorful) {
            let Farbe=sampleArray(colorArr);
            setColor(Farbe[0])
            setColor2(Farbe[1])
            setColor3(Farbe[2])
            setColor4("white");
        } else {
            setColor("#A4B494")
            setColor2("#BEC5AD")
            setColor3("#519872")
            setColor4("#D1DECE")
        }
    }, [preferencesGetState().colorful])
    
    useFocusEffect(
        useCallback(
            () => {
                checkColor()
            },
            [preferencesGetState().colorful]
        )
    )
    return (
        <View style={{ flex:1,marginTop:15,borderRadius:5,backgroundColor: color4 }}>
            <View style={{padding: 10,borderColor: color, borderWidth: 10, borderRadius:5}}>
                <View style={{ flexDirection: "row",backgroundColor: color3,borderRadius:10 }}>
                    <Text style={{padding:20, fontSize: 14,backgroundColor:color2,borderRadius:10 }}>
                        {value.heading.length < 13
                            ? value.heading
                            : cutDownString(value.heading, 20)}</Text>
                    <Text style={{ padding:20, marginLeft: "auto", marginRight: 5, color: "white", fontSize: 15 }}>{value.time}</Text>
                </View>
                 <Text style={{ padding: 10, paddingTop: 0, fontSize: 10, }}>{`From: ${value.username}, email: ${value.userID},\n${value.classID} | School: ${value.schoolID}`}</Text> 
                <Text selectable>{ `${value.detail}`}</Text>
            </View>
        </View>
    )
}
type NewsPostingFormProps ={
    setPrivateNewsArr:React.Dispatch<React.SetStateAction<TimedNews[]>>,
    privateNewsArr:TimedNews[],
    setParentOpacity: React.Dispatch<React.SetStateAction<number>>,
    parentOpacity: number, 
    savePostingLocation:(x:number,y:number)=>void 
}
export const NewsPostingForm = ({setPrivateNewsArr,privateNewsArr, setParentOpacity, parentOpacity,savePostingLocation }: NewsPostingFormProps) => {
    const [valText, setValText] = useState("");
    const [valHeading, setValHeading] = useState("");
    const [showSubmit, setShowSubmit] = useState(false);
    const [editability, setEditability] = useState(true);
    const { userData } = useContext(NewAuthContext);
    const [textInputBackgroundColor,setTextInputBackgroundColor] =useState("transparent");
    const [textInputHeight,setTextInputHeight] =useState(100);
    const _headingInput:React.MutableRefObject<any>=useRef(null);
    const _textInput:React.MutableRefObject<any>=useRef(null);
    const [color,setColor]=useState("#7B9362");
    const [color2,setColor2]=useState("#3B5249");
    const [color3,setColor3]=useState("#C6D5C3");
    const [color4,setColor4]=useState("#A4B494");
    // const _backgroundFallbackColor=useRef("#95a5a6");
    // const _focusBackgroundColor=useRef("white");
    const checkColor = useCallback(() => {
        if (preferencesGetState().colorful) {
            let Farbe=sampleArray(colorArr);
            setColor(Farbe[0])
            setColor2(Farbe[1])
            setColor3("white")
            setColor4(Farbe[3]);
        } else {
            setColor("#7B9362")
            setColor2("#3B5249")
            setColor3("#C6D5C3")
            setColor4("#A4B494")
        }
    }, [preferencesGetState().colorful])
    useFocusEffect(
        useCallback(
            () => {
                checkColor()
            },
            [preferencesGetState().colorful]
        )
    )
    function submitHanlding()
    {
        let newPost =
        {
        _id: Date.now().toString(),
        heading: valHeading, 
        detail: valText, 
        classID: userData!.classID, 
        userID: userData!.userID, 
        username: userData!.username, 
        schoolID: userData!.schoolID,
        time:""
        }
        newPost.time=dateStringFormat(newPost._id);
        postNews(newPost).then(
            (isOK)=>{
                if(!isOK) return;
                createTwoButtonAlert(I18n.t("SuccessfullySubmitted"), I18n.t("Success"));
                setPrivateNewsArr([newPost].concat(privateNewsArr))
                setValHeading("");
                setValText("");
            }
        )
        Keyboard.dismiss()
    }
    useEffect(()=>{
        if(valHeading!=""||valText!="") setShowSubmit(true);
        else setShowSubmit(false);
    },[valText,valHeading])
    return (
        <View style={{ flex: 1 }}
            onLayout={(event)=>{
                    let {x,y}= event.nativeEvent.layout;
                    savePostingLocation(x, y);
                }}
        > 
            <View
                style={{padding: 10, borderColor: color4, borderWidth: 10, borderRadius: 5,backgroundColor:color3 }}
            >
                <ScrollView keyboardShouldPersistTaps={"handled"}>
                    <View style={{ backgroundColor: color4,padding:10,borderRadius:5 }}>
                    <TextInput
                        ref={_headingInput}
                        style={[{ 
                            padding: 10,
                            textAlignVertical: 'top',
                            backgroundColor:"transparent",
                            color:"black",
                            height:50
                        }]}                        
                        placeholder={I18n.t("WhatToSay")+"...."}
                        placeholderTextColor="#000" 
                        editable={editability}
                        value={valHeading}
                        onChangeText={value => { setValHeading(value) }}
                        onFocus={()=>{
                            setParentOpacity(0.1);
                        }}
                    />
                    </View>
                    <TextInput
                        ref={_textInput}
                        style={[{ 
                            padding: 10,
                            textAlignVertical: 'top',
                            backgroundColor:"transparent",
                            color:color2,
                            height:Math.max(textInputHeight,100)
                        }]}                        
                        multiline={true}
                        placeholder={I18n.t("TypeSomething")}
                        editable={editability}
                        value={valText}
                        onContentSizeChange={(e) =>  setTextInputHeight(e.nativeEvent.contentSize.height)}
                        onChangeText={value => { setValText(value) }}
                        onFocus={()=>{
                            setParentOpacity(0.1);
                        }}
                    />
                   {
                   showSubmit?<Pressable
                    onPress={()=>submitHanlding()}
                    ><Text
                    style={{backgroundColor:color,padding:20,textAlign: 'center',borderRadius:7}}
                    >
                        Submit
                    </Text>
                        </Pressable>:undefined}
                </ScrollView>
            </View>
        </View>
    )
}




export default NewsFeed;