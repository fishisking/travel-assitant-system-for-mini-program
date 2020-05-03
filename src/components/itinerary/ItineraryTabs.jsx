import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import ItineraryHotelTab from './tabs/ItineraryHotelTab'
import ItineraryCustomPlaceTab from './tabs/ItineraryCustomPlaceTab'
import ItinerarySceneTab from './tabs/ItinerarySceneTab'
import './ItineraryTabs.less'
export default class ItineraryTabs extends Taro.Component {
  constructor() {
    super(...arguments)
    this.state = {
      current: 0,
      tabList: [
        { title: '景点信息' },
        { title: '酒店信息' },
        { title: '自定义地点信息' }
      ],
      data:{
        sceneData:[],
        hotelData:[],
        customPlaceData:[]
      },
      user_id:null
    }
  }
  handleClick(value) {
    this.setState({
      current: value
    })
  }
  divideType(itinerarys) {
    if(!(itinerarys instanceof Array)){
      return false;
    }
    let data = {
      sceneData:[],
      hotelData:[],
      customPlaceData:[]
    }
    if (itinerarys.length > 0) {
      for (let i = 0; i < itinerarys.length; i++) {
        if (itinerarys[i].type_id == '0') {
          data.sceneData.push(itinerarys[i])
        }
        else if (itinerarys[i].type_id == '1') {
          data.hotelData.push(itinerarys[i])
        }
        else {
          data.customPlaceData.push(itinerarys[i])
        }
      }
    }
    this.setState({
      data
    },()=>{
      //console.log(this.state.data)
    })
    //console.log(this.state.data)
  }
  componentWillMount() {
    var date = (new Date()).format("yyyy-M-dd") 
    const user_id = this.props.user_id
    Taro.request({
      url: 'http://192.168.192.194:8088/keshe1/api/getItineraryByDate',
      data: {
        user_id,
        destination_date: date
      },
      method: 'GET',
    }).then((res) => {
      this.divideType(res.data)
    })
  }
  render() {
    return (
      <AtTabs
        animated={false}
        current={this.state.current}
        tabList={this.state.tabList}
        onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.current} index={0} >
          <ItinerarySceneTab sceneData={this.state.data.sceneData}></ItinerarySceneTab>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1}>
          <ItineraryHotelTab hotelData={this.state.data.hotelData}></ItineraryHotelTab>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={2}>
          <ItineraryCustomPlaceTab customPlaceData={this.state.data.customPlaceData}></ItineraryCustomPlaceTab>
        </AtTabsPane>
      </AtTabs>
    )
  }
}