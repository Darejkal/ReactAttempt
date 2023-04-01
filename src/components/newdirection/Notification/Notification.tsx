import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
import { Platform } from 'react-native';
import { asyncStorageGetStoredData } from '../../AsyncShortcut';
import { NEW_DATA_KEY } from '../../KEYS';
import { TimedNews } from '../HomeScreen/NewsFeed';
export async function pushNewNotification(){
    console.log("notification started")
    asyncStorageGetStoredData<TimedNews[]>(NEW_DATA_KEY).then((arr)=>{
        if(arr){
            for(let i=0; i<arr.length;i++){
                let value = arr[i]
                if(value.classID)
                    newNotification(value.heading,value.classID,value.detail,0)
                    //TODO: nonprivate news?
            }
        }
    })
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      });
}
export async function newNotification(title:string,subtitle:string,body:string,when:number/*milisecond*/){
    const{status} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted'){
        console.log("Permission to make notification not granted////////////////")
    } else {
        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('SchoolNotification213', {
              name: 'SchoolNotification312',
              importance: Notifications.AndroidImportance.DEFAULT,
              vibrationPattern: [0, 250, 250, 250],
              lightColor: '#FF231F7C',
            });
          }
        await Notifications.scheduleNotificationAsync(
            {
                content:{
                    title:title,
                    subtitle:subtitle,
                    body:body,
                    badge:1,
                    priority: "DEFAULT",
                    vibrate: [0, 250, 250, 250],
                    color: "#bdc3c7",
                    sound:true,
                    autoDismiss:true
                },
                trigger:{"seconds":when/1000},
            }
        )
    }
}

export default Notifications;