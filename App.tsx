import  {Providers}  from './src/components/Providers';
import React, { useEffect, useRef, useState } from 'react'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
import { Platform } from 'react-native';
// import Constants from 'expo-constants';
// import {Subscription} from '@unimodules/react-native-adapter/build/EventEmitter'
import { setUpFetchInBackground } from './src/components/newdirection/Notification/BackgroundTask';
type AppProps = { }
export const App: React.FC<AppProps> = ({ }) => {
    useEffect(()=>{
        registerForNotificationsAsync()
        setUpFetchInBackground()
        console.log("Setting Notification Handler")
        Notifications.setNotificationHandler({
          handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
          }),
        });
    },[])
    // const [expoPushToken, setExpoPushToken] = useState('');
    // const [notification, setNotification] = useState<Notifications.Notification>();
    // const notificationListener = useRef<Subscription>();
    // const responseListener = useRef<Subscription>();
    // useEffect(
    //     ()=>{
    //     registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    
    //     notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    //       setNotification(notification);
    //     });
    
    //     responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    //       console.log(response);
    //     });
    
    //     return () => {
    //       //@ts-expect-error
    //       Notifications.removeNotificationSubscription(notificationListener);
    //        //@ts-expect-error
    //       Notifications.removeNotificationSubscription(responseListener);
    //     };
    //   }, []);
    return (
        <Providers/>
    )
};
async function registerForNotificationsAsync() {
    // let token;
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Hey! You might want to enable notifications for my app, they are good.');
        return;
      }
      // token = (await Notifications.getExpoPushTokenAsync()).data;
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    // return token;
  }
export default App;