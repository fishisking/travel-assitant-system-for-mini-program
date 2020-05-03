import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './itinerary.less'
import { AtIcon} from 'taro-ui'
import {TabText} from '../../Components/common/Common'
import ItineraryTabs from '../../Components/itinerary/ItineraryTabs'
export default class itinerary extends Taro.Component {
  config = {
    navigationBarTitleText: '行程页'
  }
  constructor () {
    super(...arguments)
    this.state = {
      open: true,
      user_id:this.$router.params.user_id,
      date:(new Date()).format("yyyy-M-dd") 
    }
  }
  handleClick (value) {
    this.setState({
      open: value
    })
  }
  render () {
    return (
      <View className='index'>
        <View className="header">
          <View className="header-date">
            <Text>当前行程日历</Text>
            <View className="header-date-right">
              <Text className="header-date-text">{this.state.date}</Text>
              <AtIcon value='calendar' size='24' color='#409EFF'></AtIcon>
            </View>
          </View>
        </View>
        <TabText text="行程单"></TabText>
        <ItineraryTabs user_id={this.state.user_id}></ItineraryTabs>
      </View>
    )
  }
}
