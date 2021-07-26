import { createStore } from 'redux'
import { asyncStorageGetStoredData } from './AsyncShortcut'
import { SETTINGS_KEY } from './KEYS'
import { useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Restart} from 'fiction-expo-restart';
type SettingPreferences = {
    colorful: boolean,
    forcedLanguage:boolean,
    language:string
}
type SettingActions = {
    type: string,
    payload?: Object
}
//@ts-expect-error
let Preferences = createStore(settingPreferences)
Preferences.subscribe(() => console.log(Preferences.getState()))
const { getState } = Preferences
export { getState as preferencesGetState }
function settingPreferences(preferences: SettingPreferences = {
    colorful: true,
    forcedLanguage:false,
    language:"en"
}, action: SettingActions) {
    switch (action.type) {
        case 'COLORFUL_ENABLED':
            return {
                ...preferences,
                colorful: true
            }
        case 'COLORFUL_DISABLED':
            return {
                ...preferences,
                colorful: false
            }
        case 'FORCED_LANGUAGE':
            return {
                ...preferences,
                forcedLanguage: true
            }
        case 'UNFORCED_LANGUAGE':
            return {
                ...preferences,
                forcedLanguage: false
            }
        case 'LANGUAGE_CHANGE':
            return {
                ...preferences,
                language:action!.payload
            }
        case 'RENEW_VALUE':
            return action!.payload
        default:
            return preferences
    }
}
const renewSetting = (newVal: SettingPreferences) => {
    Preferences.dispatch({ type: 'RENEW_VALUE', payload: newVal })
}
export const preferenceChangeColorfulState = (_isColorful:boolean) => Preferences.dispatch({ type: _isColorful ? 'COLORFUL_ENABLED' : 'COLORFUL_DISABLED' })
export const preferenceChangeForcedLanguageState = (_isForced:boolean) => Preferences.dispatch({ type: _isForced ? 'FORCED_LANGUAGE' : 'UNFORCED_LANGUAGE'})
// export const preferenceSetLanguageState = (language:("en"|"vi")) => Preferences.dispatch({ type:'LANGUAGE_CHANGE',payload:language)
export const preferenceSetLanguageState = (_isEN:boolean) =>{
    Preferences.dispatch({ type:'LANGUAGE_CHANGE',payload:_isEN?"en":"vi"})
    saveSettings().then(
        ()=>{
            Restart()
        }
    )
}   
export async function prepareSettings() {
    await asyncStorageGetStoredData<SettingPreferences>(SETTINGS_KEY).then(
        (value) => {
            if (value)
                renewSetting(value)
        }
    )
}
export async function saveSettings() {
    AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(Preferences.getState()))
}
