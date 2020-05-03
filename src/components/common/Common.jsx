import './Common.less'
import {AtDivider} from 'taro-ui'
export function TabText(props){
    return (
        <View>
            <View className="tab-text">{props.text}</View>
            {props.divider?<AtDivider  />:null}
        </View>
    )
}
