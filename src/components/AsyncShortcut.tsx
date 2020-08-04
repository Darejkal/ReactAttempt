import AsyncStorage from "@react-native-community/async-storage";

export async function asyncStorageGetStoredData<T>(KEY: string): Promise<T | null> {
    const json:string|null = await asyncStoragecontains(KEY).then((contains) => {
        if(contains)
           return AsyncStorage.getItem(KEY)
           else return null;
       })
       const data:T|null = json? await JSON.parse(json) as T:null;
       return new Promise((resolve)=>{
           resolve(data)
       });
}
export async function asyncStoragecontains(KEY: string): Promise<boolean> {
   return await AsyncStorage.getAllKeys().then((arr: string[]) => {
       return arr.includes(KEY)
   })
}