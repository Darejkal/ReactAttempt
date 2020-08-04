import React, { useState, useContext, useEffect, useRef } from 'react'
import { View, Text, PointPropType, ActivityIndicator, FlatList } from 'react-native';
import { UNITED_NEWS_KEY, NEWS_URL } from '../../KEYS';
import AsyncStorage from '@react-native-community/async-storage';
import { asyncStorageGetStoredData } from '../../AsyncShortcut';
import { NewAuthContext } from '../NewAuthProvider';
import { Center } from '../../Center';
import { createTwoButtonAlert } from '../../Alerts';
export type NewsFeedProps = {}
export const NewsFeed: React.FC<NewsFeedProps> = ({ }) => {
    const _isMounted = useRef(true);
    const [done, setDone] = useState(false);
    const { data } = useContext(NewAuthContext);
    const [newsArr, setNewsArr] = useState<News[]>([]);
    const [privateNewsArr, setPrivateNewsArr] = useState<PrivateNews[]>([]);
    //let quantity = fetchNewsQuantity();
    const loadNewsFromInside = async () => {
        asyncStorageGetStoredData<NewsObj>(UNITED_NEWS_KEY).then(
            (value) => {
                if (_isMounted.current&&value) {
                    setNewsArr(duplicateFilter(newsArr.concat(value._news)))
                    setPrivateNewsArr(duplicateFilter(privateNewsArr.concat(value._privateNews)))
                    setDone(true)
                }
            }).catch(error => console.error(error))
    }

    const loadDataOnlineFromInside = async () => {
        fetchNews(0,data!.classID).then((value)=>{
            if(_isMounted.current)
            {
            setNewsArr(duplicateFilter(newsArr.concat(value._news)))
            setPrivateNewsArr(duplicateFilter(privateNewsArr.concat(value._privateNews)))
            setDone(true)
            }
        })
    }
    if (!done) {
        loadNewsFromInside()
        loadDataOnlineFromInside()
    }
    useEffect(() => {
        return ()=>{
            _isMounted.current=false
        }
    },[])
    useEffect(() => {
        if (!done)
            loadDataOnlineFromInside()
    })

    let content: any
    if (!done) {
        content = (<Center>
            <ActivityIndicator size="large" />
        </Center>)
    } else {
        content = (
            <View>
                {
                    newsArr.map((value,index)=>
                        <NewsView heading={value.heading} detail={value.detail} key={index} />
                    )
                }
                {
                    privateNewsArr.map((value,index)=>
                        <NewsView heading={value.heading} detail={value.detail} key={index} />
                    )
                }
            </View>
        )
    }
    return content
};
const fetchNews = async (id:number,classID:string):Promise<NewsObj> =>{
    const arr1= await fetchData<News[]>(NEWS_URL+ "id=" + id)
    const arr2= await fetchData<PrivateNews[]>(NEWS_URL+"classID=" + classID + "/" + "id=" + id)
    let temp:NewsObj={_news:[],_privateNews:[]}
    if(!arr1) createTwoButtonAlert("Error ecountered while getting data","Error 101")
    else temp._news=arr1
    if(!arr2) createTwoButtonAlert("Error ecountered while getting data","Error 102")
    else temp._privateNews=arr2
    asyncStorageGetStoredData<NewsObj>(UNITED_NEWS_KEY).then(
        (value) => {
            if (value) {
               value._news= duplicateFilter(value._news.concat(temp._news))
               value._privateNews= duplicateFilter(value._privateNews.concat(temp._privateNews))
            }
            else {
                AsyncStorage.setItem(UNITED_NEWS_KEY, JSON.stringify(temp));
            }
        }
    )
    return temp
}

// const fetchPublicNews = async (id: number): Promise<News[] | null> => {
//     const fetchURL = "https://schoolproject213.herokuapp.com/data/newsFeed/"
//         + "id=" + id
//     let valueHolder: null | News[] = null
//     fetchData<News[]>(fetchURL).then(async (arr) => {
//         if (!arr) throw ("NEWS IS NULL");
//         asyncStorageGetStoredData<News[]>(PUBLIC_NEWS_DATA_KEY).then(
//             (value) => {
//                 if (value) {
//                     valueHolder = duplicateFilter(value.concat(arr))
//                     AsyncStorage.setItem(PUBLIC_NEWS_DATA_KEY, JSON.stringify(valueHolder));
//                 }
//                 else {
//                     AsyncStorage.setItem(PUBLIC_NEWS_DATA_KEY, JSON.stringify(arr));
//                     valueHolder = arr
//                 }
//             }
//         )
//     }).catch((e) => {
//         console.error(e);
//     })

//     return valueHolder
// }
// const fetchPrivateNews = async (id: number, classID: string): Promise<PrivateNews[] | null> => {
//     const fetchURL = "https://schoolproject213.herokuapp.com/data/newsFeed/"
//         + "classID=" + classID + "/" + "id=" + id
//     let valueHolder: null | PrivateNews[] = null
//     fetchData<PrivateNews[]>(fetchURL).then(async (arr) => {
//         if (!arr) throw ("NEWS IS NULL");
//         asyncStorageGetStoredData<PrivateNews[]>(PRIVATE_NEWS_DATA_KEY).then(
//             (value) => {
//                 if (value) {
//                     valueHolder = duplicateFilter(value.concat(arr))
//                     AsyncStorage.setItem(PRIVATE_NEWS_DATA_KEY, JSON.stringify(valueHolder));
//                 }
//                 else {
//                     AsyncStorage.setItem(PRIVATE_NEWS_DATA_KEY, JSON.stringify(arr));
//                     valueHolder = arr
//                 }
//             }
//         )
//     }).catch((e) => {
//         console.error(e);
//     })
//     return valueHolder
// }
type News = { _id: string, heading: string, detail: string }
type PrivateNews = { _id: string, heading: string, detail: string, classID: string }
type NewsObj = { _news: News[], _privateNews: PrivateNews[] }
const fetchData = async <T extends unknown>(url: string): Promise<T | null> => {
    try {
        const response = await fetch(url);
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
const NewsView =({heading,detail}:{heading:string,detail:string}) => (
    <>
        <View style={{ backgroundColor: "#bdc3c7" }}>
            <Text style={{ padding: 10, fontSize: 15 }}>{heading}</Text>
        </View>
        <View style={{ backgroundColor: "#fff", padding: 20 }}>
            <Text>{detail}</Text>
        </View>
    </>
)
function duplicateFilter<T extends { _id: string }>(a: T[]) {
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
const dateFromObjectId = function (objectId) {
    //TODO
    //show time?
    return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
};
export default NewsFeed;