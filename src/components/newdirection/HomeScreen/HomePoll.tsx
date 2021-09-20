import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useRef, useState } from 'react'
import { View ,Text} from 'react-native';
import RNPoll, { IChoice } from 'react-native-poll';
import RNAnimated  from 'react-native-poll'
import { preferencesGetState } from '../../Preferences';
import { colorArr, cutDownString, sampleArray } from './NewsFeedEngine';
type HomePollProps = {}
export const HomePoll: React.FC<HomePollProps> = ({ }) => {
    const choices: Array<IChoice> = [
        { id: 1, choice: "7 colours", votes: 12 },
        { id: 2, choice: "Infinite amounts spanning from purple to red", votes: 20 },
        { id: 3, choice: "Idk", votes: 3 },
        { id: 4, choice: "3 - Red,Green,Bluee", votes: 5 },
        { id: 5, choice: "Other Options", votes: 9 },
      ];
      const [pollHeading,setPollHeading]=useState("Yikes")
      const [color, setColor] = useState("#95a5a6")
      const [color2, setColor2] = useState("#3b5249")
      const [color3, setColor3] = useState("#519872")
      const [color4, setColor4] = useState("#D1DECE")
      const checkColor = useCallback(() => {
          if (preferencesGetState().colorful) {
              let Farbe=sampleArray(colorArr);
              setColor(Farbe[0])
              setColor2(Farbe[1])
              setColor3(Farbe[2])
              setColor4("white");
          } else {
              setColor("#A4B494")
              setColor2("#BEC5AD")
              setColor3("#519872")
              setColor4("#D1DECE")
          }
      }, [preferencesGetState().colorful])
      
      useFocusEffect(
          useCallback(
              () => {
                  checkColor()
              },
              [preferencesGetState().colorful]
          )
      )
    return (
        <View style={{ flex:1,marginTop:15,borderRadius:2,backgroundColor: color4 }}>
        <View style={{padding: 10,borderColor: color, borderWidth: 10, borderRadius:2}}>
            <View style={{ flexDirection: "row",backgroundColor: color3,borderRadius:2 }}>
                <Text style={{padding:20, fontSize: 14,backgroundColor:color2,borderRadius:2 }}>
                    {pollHeading.length < 13
                        ? pollHeading
                        : cutDownString(pollHeading, 20)}</Text>
                <Text style={{ padding:20, marginLeft: "auto", marginRight: 5, color: "white", fontSize: 15 }}>Polling</Text>
            </View>
            <Text style={{ padding: 0, paddingTop: 0, fontSize: 10, }}>"How many colours do rainbows have?"</Text> 
            <RNPoll
            totalVotes={30}
            choices={choices}
            onChoicePress={(selectedChoice: IChoice) =>
                console.log("SelectedChoice: ", selectedChoice)
            }
        />
        </View>
    </View>
    )
};

export default HomePoll;