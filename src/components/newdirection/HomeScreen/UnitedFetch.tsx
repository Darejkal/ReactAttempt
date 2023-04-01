// import NewsFeed from "./NewsFeed";
// import { TimetableData } from "./Timetable2";
// import { asyncStorageGetStoredData } from "../../AsyncShortcut";
// import { DATA_PACKAGE_KEY, LOCAL_PACKAGE,PACKAGE_URL, ONLINE_PACKAGE, } from "../../KEYS";
// import { createTwoButtonAlert } from "../../Alerts";
// import { News, TimedNews } from "./HomeView";

// type UnitedFetchProps = { 
//     classID:string
//     newsFeedCallBack:(result:TimedNews[],TYPE_OF_PACKAGE:number)=>void,
//     timetableCallBack:(result:TimetableData)=>void,
// }
// type OnlineHomeDataPackage ={"timetable":TimetableData|null,"news":News[],"error":number}
// type LocalHomeDataPackage ={"timetable":TimetableData,"news":News[]}

// export const unitedFetch = async({classID,newsFeedCallBack,timetableCallBack}:UnitedFetchProps):Promise<{done1:boolean,done2:boolean}>=>{
//     return await fetchData<OnlineHomeDataPackage>(PACKAGE_URL+classID).then(
//         async (value)=>{
//             let done = {done1:false,done2:false}
//             if(!value){
//                 createTwoButtonAlert(`Error while loading data. Error code YN213`,"Warning")
//                 return done
//             } 
//             const {news}=value
//             let temp:TimedNews[]=[]
//             for (let i = 0; i < news.length; i++) {
//                 const tempItem: TimedNews =
//                 {
//                     ...news[i],
//                     time: dateFromObjectId(news[i]._id).toDateString()
//                 }
//                 temp.push(tempItem)
//             }
//             newsFeedCallBack(temp,ONLINE_PACKAGE)
//             //TODO:expo task manager
//             if(value.timetable){
//                 timetableCallBack(value.timetable)
//                 done.done1=true
//             if(value.error>0)
//                 {
//                     createTwoButtonAlert(`Error while loading data. Error code EE${value.error}`,"Warning")
//                 }
//             else done.done2=true
//             } else {
//             if(value.error>1)
//                 {
//                     createTwoButtonAlert(`Error while loading data. Error code EE${value.error}`,"Warning")
//                 }
//             else done.done2=true
//             }
//             return done
//         })
// }
// export const fetchData = async <T extends unknown>(url: string): Promise<T | null> => {
//     try {
//         const response = await fetch(url, {
//             headers: {
//                 'Cache-Control': 'no-cache'
//             }
//         });
//         if (response.ok) {
//             const body = await response.json();
//             return new Promise((resolve) => { resolve(body) })
//         } else {
//             throw new Error(response.statusText);
//         }

//     } catch (e) {
//         return new Promise((reject) => { reject(null) });
//     }
// }
// export const dateFromObjectId = function (id: string) {
//     return new Date(parseInt(id.substring(0, 8), 16) * 1000);
// };