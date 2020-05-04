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

    }
    handlePageChange(obj) {
        this.setState({
            current: obj.current
        })
    }
    componentDidMount() {
        console.log(this.props)
        this.setState({
            data: this.props.customPlaceData,
            current: (this.props.customPlaceData.length > 0) ? 1 : 0,
            total: (this.props.customPlaceData.length > 0) ? this.props.customPlaceData.length : 0
        }, () => {
            console.log(this.state.data)
        })
    }
    render(){      
        const data = this.state.data
        const current = this.state.current
        const total = this.state.total
        const time = `${(data.length > 0 && data[current - 1].destination_date) ? data[current - 1].destination_date : ''} ${(data.length > 0 && data[current - 1].destination_time) ? data[current - 1].destination_time: '无具体时间'}`
        return (
            <View>
                <AtList>
                    <AtListItem
                        title='目的地'
                        note={(data.length > 0 && data[current - 1].destination_name) ? data[current - 1].destination_name : '无'}
                        thumb={require('../../../assets/img/目的地.png')}
                        />
                        <AtListItem
                        title='地点位置'
                        note={(data.length > 0 && data[current - 1].destination_address) ? data[current - 1].destination_address : '无'}
                        arrow='right'
                        thumb={require('../../../assets/img/导航.png')}
                        />
                        <AtListItem
                        title='出发时间'
                        note={time}
                        thumb={require('../../../assets/img/时间.png')}>
                        </AtListItem>
                        <AtListItem
                        title='备注'
                        note={(data.length > 0 && data[current - 1].note) ? data[current - 1].note : '无'}
                        thumb={require('../../../assets/img/更多.png')}>
                        </AtListItem>
                        <AtListItem
                        title='自定义地点信息'
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