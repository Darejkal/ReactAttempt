import { Providers } from './src/components/Providers';
import React, { useEffect, useRef, useState, useCallback } from 'react'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
import { Platform } from 'react-native';
import { setUpFetchInBackground } from './src/components/newdirection/Notification/BackgroundTask';
import { prepareSettings, preferencesGetState } from './src/components/Preferences';
import { prepareLanguage } from './src/components/Language';
import I18n from 'i18n-js';


type AppProps = {}
export const App: React.FC<AppProps> = ({ }) => {
  useEffect(() => {
    const asyncUseEffect = async () => {
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
    }
    asyncUseEffect()
  }, [])

  return (
    <Providers />
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
    alert(I18n.t("appNotiNotEnabled"));
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