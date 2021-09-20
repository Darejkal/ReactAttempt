import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import I18n from "i18n-js";
import React, { useCallback, useRef, useState } from "react";
import { View, Text } from "react-native";
import { createTwoButtonAlert } from "../../Alerts";
import { asyncStorageGetStoredData } from "../../AsyncShortcut";
import { NEWSFEED_HANDLER_URL, NEWSFEED_KEY } from "../../KEYS";
import { preferencesGetState } from "../../Preferences";
import { Answer, CODE } from "../Accessibility/ErrorHandlingParams";
// export type Answer={
//     internalStatus:string;
//     [key:string]:any,
// }

export type TimedNews = { _id: string, heading: string, detail: string, classID: string, userID: string, username: string, schoolID: string, time: string }
// const dateFromObjectId = function (id: string) {
//     return new Date(parseInt(id.substring(0, 8), 16) * 1000);
// };
// function dateToString(date: Date) {
//     return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
// }
export function dateStringFormat(id: string){
    let date =  new Date(parseInt(id.substring(0, 8), 16) * 1000);
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
}

export async function NewsArrayHandler(answer: Answer): Promise<TimedNews[]> {
    let insideTemp: TimedNews[] = [];
    if (!answer.Items) {
        throw "Error while getting data from server 100";
    }
    else {
        for (let i = 0; i < answer.Items.length; i++) {
            const tempItem: TimedNews =
            {
                ...answer.Items[i],
                time: dateStringFormat(answer.Items[i]._id)
            }
            insideTemp.push(tempItem)
        }
        insideTemp.sort((a,b)=>{return parseInt(a.time,10)-parseInt(b.time,10)})
    }
    return insideTemp;
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
export function cutDownString(originalText: string, maxLength: number = 13): string {
    if (originalText.length < maxLength) return originalText
    let arr = originalText.split(" ")
    let length = arr.length
    let text = ""
    for (let i = 0; i < length; i++) {
        if ((arr[i] + arr[i + 1]).length < maxLength) {
            arr[i + 1] = arr[i] + " " + arr[i + 1]
        } else {
            text += (arr[i] + '\n')
            arr[i] = ""
        }
    }
    text += arr[length - 1]
    return text
}
export const colorArr = ["#778beb", "#546de5", "#63cdda", "#3dc1d3"]
export function sampleArray(array: Array<string>) {
    var currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}
export async function postNews(timedNews: TimedNews):Promise<boolean> {
    console.log("POST CALLED--------------------------------------");
    return fetch(NEWSFEED_HANDLER_URL,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': "application/json"
            },
            body: JSON.stringify(
                {
                    method: "add",
                    obj: {
                        _id: timedNews._id,
                        heading: timedNews.heading, 
                        detail: timedNews.detail, 
                        classID: timedNews.classID, 
                        userID: timedNews.userID, 
                        username: timedNews.username, 
                        schoolID: timedNews.schoolID, 
                    }
                }
            )
        }).then(
           async (response)=>{
            if (response.ok) {
                let preanswer = await response.json()
                let answer;
                if (typeof preanswer.body === "string")
                    answer = await JSON.parse(preanswer.body);
                else {
                    answer = await preanswer.body;
                }
                console.log("------------- " + JSON.stringify(answer));
                switch (answer?.internalStatus) {
                    case CODE.SUCCESS:
                        console.log("--------------- success")
                        return true;
                        break;
                    case CODE.FAILED:
                        throw I18n.t("UnknowError");
                    default:
                        throw I18n.t("PostingDataToServerError102");
                }
    } else throw I18n.t("UnknowError");
}
    ).catch((e) => {
            createTwoButtonAlert(e, I18n.t("error"));
            return false;
        });
}
export const fetchNews = async (schoolID: string, classID: string): Promise<TimedNews[] | never[]> => {
    console.log("FETCH CALLED--------------------------------------");
    return fetch(NEWSFEED_HANDLER_URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            method: "get",
            obj: {
                classID: classID,
                schoolID: schoolID
            }
        })
    }).then(async (response) => {
        let temp: TimedNews[] = [];
        if (response.ok) {
            let preanswer = await response.json()
            let answer;
            if (typeof preanswer.body === "string")
                answer = await JSON.parse(preanswer.body);
            else {
                answer = await preanswer.body;
            }
            console.log("------------- " + JSON.stringify(answer));
            switch (answer?.internalStatus) {
                case CODE.SUCCESS:
                    console.log("--------------- success");
                    temp = await NewsArrayHandler(answer);
                    storeNews(temp);
                    console.log("returning temp ...... ");
                    break;
                case CODE.FAILED:
                    throw I18n.t("UnknowError");
                default:
                    throw I18n.t("GettingDataFromServerError");
            }
        }
        return temp;
        // throw "Error while getting data from server";
    }).catch((e) => {
        createTwoButtonAlert(e, I18n.t("getDataError"));
        return [];
    });
}
function storeNews(temp:TimedNews[]){
    asyncStorageGetStoredData<TimedNews[]>(NEWSFEED_KEY).then(
        (value) => {
            if (value) {
                temp = duplicateFilter(temp.concat(value))
            }
            AsyncStorage.setItem(NEWSFEED_KEY, JSON.stringify(temp));
        }
    )
}