import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { asyncStorageGetStoredData } from '../../AsyncShortcut';
import { dateFromObjectId, TimedNews, News, fetchData, duplicateFilter } from '../HomeScreen/NewsFeed';
import { createTwoButtonAlert } from '../../Alerts';
import { NEWS_URL, UNITED_NEWS_KEY, TIMETABLE_KEY, NEW_DATA_KEY } from '../../KEYS';
import AsyncStorage from '@react-native-community/async-storage';
import { TimetableData } from '../HomeScreen/Timetable2';
import { pushNewNotification } from './Notification';
import I18n from 'i18n-js';

export async function setUpFetchInBackground(){
    const backgroundFunc = async()=>{
        console.log("background started")
        let returnValue:boolean = false
        asyncStorageGetStoredData<TimetableData>(TIMETABLE_KEY).then(
            (value)=>{
                if(value)
                    fetchNewsToGetNewNews(0,value.classID).then(
                        (arr)=>{
                            asyncStorageGetStoredData<TimedNews[]>(NEW_DATA_KEY).then((oldArr)=>{
                                if(oldArr)
                                    arr.push(...oldArr)
                                console.log("background got here :)")
                                AsyncStorage.setItem(NEW_DATA_KEY,JSON.stringify(duplicateFilter(arr)))
                                pushNewNotification()
                            })
                            returnValue=true
                        }
                    )
            }
        ).catch(error=>console.error(error))
        return returnValue
    }
    registerFetchTask("Refresh App",3000,backgroundFunc)
}
const fetchNewsToGetNewNews = async (id: number, classID: string): Promise<TimedNews[]> => {
    const arr1 = await fetchData<News[]>(NEWS_URL + "id=" + id)
    const arr2 = await fetchData<News[]>(NEWS_URL + "classID=" + classID + "/" + "id=" + id)
    let temp: TimedNews[] = []
    if (!arr1) createTwoButtonAlert(I18n.t("getDataError"), I18n.t("error")+"101")
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
    if (!arr2) createTwoButtonAlert(I18n.t("getDataError"), I18n.t("error")+"102")
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
    let newNews:TimedNews[]=[];
    asyncStorageGetStoredData<TimedNews[]>(UNITED_NEWS_KEY).then(
        (value) => {
            if (value) {
                for(let i =0;i<temp.length;i++){
                    if(value.indexOf(temp[i])===-1){
                        newNews.push(temp[i])
                    }
                }
                if(!arr1||!arr2) {
                    temp.push(...value)
                    temp = duplicateFilter(temp)
                }
            }
                AsyncStorage.setItem(UNITED_NEWS_KEY, JSON.stringify(temp));
        }
    )
    return newNews
}
async function registerFetchTask(taskName:string,taskInterval:number,taskFunction:()=>Promise<boolean>) {
    TaskManager.defineTask(taskName, async () => {
        try {
          const receivedNewData = await taskFunction()
          return receivedNewData ? BackgroundFetch.Result.NewData : BackgroundFetch.Result.NoData;
        } catch (error) {
          return BackgroundFetch.Result.Failed;
        }
      });

    const status = await BackgroundFetch.getStatusAsync();
    switch (status) {
        case BackgroundFetch.Status.Restricted:
        case BackgroundFetch.Status.Denied:
            console.warn("Background execution is disabled");
            return;

        default: {
            console.log("Background execution allowed");
            let _isRegistered = await TaskManager.isTaskRegisteredAsync(taskName);
            if (!_isRegistered) {
                console.log("Registering task");
                await BackgroundFetch.registerTaskAsync(taskName);
            } else {
                console.log(`Task ${taskName} already registered, skipping`);
            }

            console.log("Setting interval to", taskInterval);
            await BackgroundFetch.setMinimumIntervalAsync(taskInterval);
        }
    }
}
                