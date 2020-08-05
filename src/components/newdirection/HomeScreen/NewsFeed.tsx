import React, { useState, useContext, useEffect, useRef } from 'react'
import { View, Text, PointPropType, ActivityIndicator, FlatList } from 'react-native';
import { UNITED_NEWS_KEY, NEWS_URL } from '../../KEYS';
import AsyncStorage from '@react-native-community/async-storage';
import { asyncStorageGetStoredData } from '../../AsyncShortcut';
import { NewAuthContext } from '../NewAuthProvider';
import { Center } from '../../Center';
import { createTwoButtonAlert } from '../../Alerts';
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
                console.log("Ok2323232")
                console.log(value)
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
        console.log("------------refreshing is " + refreshing)
        console.log("------------------done is " + done)
        if (refreshing)
            setDone(false)
        if (!done) {
            console.log("pippppppppppppppppppppppppppppppppppppppppppp")
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
                    <Text style={{ padding: 10, color: "grey" }}> That's all for today </Text>
                </Center> : <></>
            }
        </View>
    )
};
const fetchNews = async (id: number, classID: string): Promise<TimedNews[]> => {
    const arr2 = await fetchData<News[]>(NEWS_URL + "id=" + id)
    const arr1 = await fetchData<News[]>(NEWS_URL + "classID=" + classID + "/" + "id=" + id)
    let temp: TimedNews[] = []
    if (!arr1) createTwoButtonAlert("Error ecountered while getting data", "Error 101")
    else {
        for (let i = 0; i < arr1.length; i++) {
            const tempItem: TimedNews =
            {
                ...arr1[i],
                time: dateFromObjectId(arr1[i]._id).toDateString()
            }
            temp.push(tempItem)
        }
    }
    if (!arr2) createTwoButtonAlert("Error ecountered while getting data", "Error 102")
    else {
        for (let i = 0; i < arr2.length; i++) {
            const tempItem: TimedNews =
            {
                ...arr2[i],
                time: dateFromObjectId(arr2[i]._id).toDateString()
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

const NewsView = ({ heading, detail, classID, time }: { heading: string, detail: string, classID: string | undefined, time: string }) => (
    <View style={{ marginTop: 10 }}>
        <View style={{ backgroundColor: "#bdc3c7" }}>
            <View style={{ flexDirection: "row" }}>
                <Text style={{ padding: 10, fontSize: 15 }}>{heading}</Text>
                <Text style={{ paddingTop: 10, paddingBottom: 10, marginLeft: "auto", marginRight: 5, color: "grey", fontSize: 15 }}>{time}</Text>
            </View>
            {classID ? <Text style={{ padding: 10, paddingTop: 0, fontSize: 10, color: "grey" }}>{classID}</Text> : <></>}
        </View>
        <View style={{ backgroundColor: "#fff", padding: 20 }}>
            <Text selectable>{detail}</Text>
        </View>
    </View>
)
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
export const dateFromObjectId = function (id: string) {
    return new Date(parseInt(id.substring(0, 8), 16) * 1000);
};
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