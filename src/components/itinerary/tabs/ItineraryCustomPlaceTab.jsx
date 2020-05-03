import Taro, { Component } from '@tarojs/taro'
import {AtList,AtListItem,AtPagination } from 'taro-ui'
export default class ItineraryCustomPlaceTab extends Taro.Component{
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            current: 0,
            total: 0
        }
    }
    static options = {
        addGlobalClass: true
    }
    handleClick(e) {
        if (this.state.data.length > 0) {
            Taro.navigateTo({
                url: '/pages/detail/sceneDetail/hotelDetail?kw=' + this.state.data[this.state.current - 1].destination_name
            })
        } else {
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
            data: this.props.customPlaceData,
            current: (this.props.customPlaceData.length > 0) ? 1 : 0,
            total: (this.props.customPlaceData.length > 0) ? this.props.customPlaceData.length : 0
        }, () => {
            //console.log(this.state.data)
        })
    }
    render(){      
        const data = this.state.data
        const current = this.state.current
        const total = this.state.total
        return (
            <View>
                <AtList>
                    <AtListItem
                        title='目的地'
                        note='灵隐寺'
                        thumb={require('../../../assets/img/目的地.png')}
                        />
                        <AtListItem
                        title='地点位置'
                        note='浙江省杭州市西湖区法云弄1号'
                        arrow='right'
                        thumb={require('../../../assets/img/导航.png')}
                        />
                        <AtListItem
                        title='出发时间'
                        note="10:30(记得带身份证)"
                        thumb={require('../../../assets/img/时间.png')}>
                        </AtListItem>
                        <AtListItem
                        title='备注'
                        note="记得带身份证"
                        thumb={require('../../../assets/img/更多.png')}>
                        </AtListItem>
                        <AtListItem
                        title='景点信息'
                        arrow='right'
                        thumb={require('../../../assets/img/自定义地点.png')}></AtListItem>
                </AtList>     
                <View className="tab-pagination">
                    <AtPagination total={total} pageSize={1} current={current}
                        onPageChange={this.handlePageChange.bind(this)}>
                    </AtPagination>
                </View>
            </View>
        )
    }
}