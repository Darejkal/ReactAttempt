import React, { useState, useContext, useEffect, useRef, useCallback } from 'react'
import { View, Text, PointPropType, ActivityIndicator, FlatList } from 'react-native';
import { UNITED_NEWS_KEY, NEWS_URL } from '../../KEYS';
import AsyncStorage from '@react-native-community/async-storage';
import { asyncStorageGetStoredData } from '../../AsyncShortcut';
import { NewAuthContext } from '../NewAuthProvider';
import { Center } from '../../Center';
import { createTwoButtonAlert } from '../../Alerts';
import { preferencesGetState } from '../../Preferences';
import { useFocusEffect } from '@react-navigation/native';
import I18n from 'i18n-js';
export type NewsFeedProps = { refreshing: boolean }
export const NewsFeed: React.FC<NewsFeedProps> = ({ refreshing }) => {
    const _isMounted = useRef(true);
    const _isLoading = useRef(false);
    const [done, setDone] = useState(false);
    const { data } = useContext(NewAuthContext);
    const [privateNewsArr, setPrivateNewsArr] = useState<TimedNews[]>([]);
    const loadNewsFromInside = async () => {
        asyncStorageGetStoredData<TimedNews[]>(UNITED_NEWS_KEY).then(
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
            fetchNews(0, data!.classID).then((value) => {
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
    if (!done) {
        loadNewsFromInside()
        loadDataOnlineFromInside()
    }
    useEffect(() => {
        _isMounted.current = true
        AsyncStorage.removeItem(NEWS_URL).catch((error) => console.error(error))
        return () => {
            _isMounted.current = false
        }
    }, [])
    useEffect(() => {
        // console.log("------------refreshing is " + refreshing)
        // console.log("------------------done is " + done)
        if (refreshing)
            setDone(false)
        if (!done) {
            // console.log("pippppppppppppppppppppppppppppppppppppppppppp")
            refreshing ? loadDataOnlineFromInside() : setTimeout(loadDataOnlineFromInside, 10000)
        }
    })

    return (
        <View>
            {!done ? (<Center><ActivityIndicator size="large" /></Center>) : <></>}
            {
                privateNewsArr.map((value, index) =>
                    <NewsView heading={value.heading} detail={value.detail} classID={value.classID} time={value.time} key={index} />
                )
            }
            {done ?
                <Center>
                    <Text style={{ padding: 10, color: "grey" }}> {I18n.t("newsFeedBottom")} </Text>
                </Center> : <></>
            }
        </View>
    )
};
const fetchNews = async (id: number, classID: string): Promise<TimedNews[]> => {
    const arr2 = await fetchData<News[]>(NEWS_URL + "id=" + id)
    const arr1 = await fetchData<News[]>(NEWS_URL + "classID=" + classID + "/" + "id=" + id)
    let temp: TimedNews[] = []
    if (!arr1) createTwoButtonAlert(I18n.t("getDataError"), "Error 101")
    else {
        for (let i = 0; i < arr1.length; i++) {
            const tempItem: TimedNews =
            {
                ...arr1[i],
                time: dateToString(dateFromObjectId(arr1[i]._id))
            }
            temp.push(tempItem)
        }
    }
    if (!arr2) createTwoButtonAlert(I18n.t("getDataError"), "Error 102")
    else {
        for (let i = 0; i < arr2.length; i++) {
            const tempItem: TimedNews =
            {
                ...arr2[i],
                time: dateToString(dateFromObjectId(arr2[i]._id))
            }
            temp.push(tempItem)

        }
    }
    if (arr1 && arr2)
        AsyncStorage.setItem(UNITED_NEWS_KEY, JSON.stringify(temp));
    else
        asyncStorageGetStoredData<TimedNews[]>(UNITED_NEWS_KEY).then(
            (value) => {
                if (value) {
                    temp = duplicateFilter(temp.concat(value))
                }
                AsyncStorage.setItem(UNITED_NEWS_KEY, JSON.stringify(temp));
            }
        )
    return temp
}
function dateToString(date:Date){
    return date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()
}
export const dateFromObjectId = function (id: string) {
    return new Date(parseInt(id.substring(0, 8), 16) * 1000);
};
const NewsView = ({ heading, detail, classID, time }: { heading: string, detail: string, classID: string | undefined, time: string }) =>{
    const [color,setColor]=useState("#95a5a6")
    const willMount = useRef(true);
    const useComponentWillMount = useCallback(() => {
        if (willMount.current) {
            checkColor()
        }
        willMount.current = false;
      },[willMount]);
    const checkColor = useCallback(()=>{
        if(preferencesGetState().colorful)
        {
            if(classID){
                setColor("#e67e22")
            } else {
                setColor(sampleArray(colorArr))
            }
        } else {
            setColor("#95a5a6")
        }       
    },[preferencesGetState().colorful])
    useComponentWillMount()
    useEffect(
        ()=>{
        }
    )
    useFocusEffect(
        useCallback(
        ()=>{
            checkColor()
        },
        [preferencesGetState().colorful]
        )
    )
    return (
    <View style={{ marginTop: 10 }}>
        <View style={{ backgroundColor: color}}>
            <View style={{ flexDirection: "row" }}>
                <Text style={{ padding: 10, fontSize: 15 }}>
                    {heading.length<13
                        ?heading
                        :cutDownString(heading,20)}</Text>
                <Text style={{ paddingTop: 10, paddingBottom: 10, marginLeft: "auto", marginRight: 5, color:"white", fontSize: 15 }}>{time}</Text>
            </View>
            {classID ? <Text style={{ padding: 10, paddingTop: 0, fontSize: 10, color: "white" }}>{classID}</Text> : <></>}
        </View>
        <View style={{ backgroundColor: "#fff", padding: 20 }}>
            <Text selectable>{detail}</Text>
        </View>
    </View>
)
}
const colorArr = ["#778beb","#546de5","#63cdda","#3dc1d3"]
function sampleArray(arr){
        return arr[Math.floor(Math.random()*arr.length)];
      }
export function duplicateFilter<T extends { _id: string }>(a: T[]) {
    var seen: any = {};
    var out: T[] = [];
    var len = a.length;
    var j = 0;
    for (var i = 0; i < len; i++) {
        var item = a[i];
        var _id = item._id
        if (seen[_id] !== 1) {
            seen[_id] = 1;
            out[j++] = item;
        }
    }
    return out;
}
function cutDownString(originalText:string,maxLength:number=13):string{
    if(originalText.length<maxLength) return originalText
    let arr=originalText.split(" ")
    let length=arr.length
    let text =""
    for(let i=0;i<length;i++){
        if((arr[i]+arr[i+1]).length<maxLength){
            arr[i+1]=arr[i]+" "+arr[i+1]
        } else{
            text+=(arr[i]+'\n')
            arr[i]=""
        }
    }
    text+=arr[length-1]
    return text
}
export const fetchData = async <T extends unknown>(url: string): Promise<T | null> => {
    try {
        const response = await fetch(url, {
            headers: {
                'Cache-Control': 'no-cache'
            }
        });
        if (response.ok) {
            const body = await response.json();
            return new Promise((resolve) => { resolve(body) })
        } else {
            throw new Error(response.statusText);
        }

    } catch (e) {
        return new Promise((reject) => { reject(null) });
    }
}
export type News = { _id: string, heading: string, detail: string, classID: string | undefined }
export type TimedNews = { _id: string, heading: string, detail: string, classID: string | undefined, time: string }

export default NewsFeed;