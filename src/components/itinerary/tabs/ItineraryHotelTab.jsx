import Taro, { Component } from '@tarojs/taro'
import { AtList, AtListItem, AtPagination } from 'taro-ui'
export default class ItineraryHotelTab extends Taro.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {}
        }
    }
    static options = {
        addGlobalClass: true
    }
    handleClick(e) {
        if (this.state.data.destination_name) {
            Taro.navigateTo({
                url: '/pages/detail/hotelDetail/hotelDetail?kw='+this.state.data.destination_name
            })
        }else{
            //对话框
        }
    }
    handlePageChange(obj) {
        this.setState({
            current: obj.current
        })
    }
    componentDidMount() {
        //console.log(this.props)
        this.setState({
            data: this.props.hotelData.length>0?this.props.hotelData[0]:{},
        }, () => {
            console.log(this.state.data)
        })
    }
    render() {
        const data = this.state.data
        return (
            <View>
                <AtList>
                    <AtListItem
                        title='目的地'
                        note={(data.destination_name) ? data.destination_name : '无'}
                        thumb={require('../../../assets/img/目的地.png')}
                    />
                    <AtListItem
                        title='地点位置'
                        note={(data.destination_address) ? data.destination_address : '无'}
                        arrow='right'
                        thumb={require('../../../assets/img/导航.png')}
                    />
                    <AtListItem
                        title='出发时间'
                        note={(data.destination_time) ? data.destination_time : '无'}
                        thumb={require('../../../assets/img/时间.png')}>
                    </AtListItem>
                    <AtListItem
                        title='备注'
                        note={(data.note) ? data.note : '无'}
                        thumb={require('../../../assets/img/更多.png')}>
                    </AtListItem>
                    <AtListItem
                        onClick={this.handleClick.bind(this)}
                        title='酒店信息'
                        arrow='right'
                        thumb={require('../../../assets/img/酒店.png')}></AtListItem>
                </AtList>
            </View>
        )
    }
}