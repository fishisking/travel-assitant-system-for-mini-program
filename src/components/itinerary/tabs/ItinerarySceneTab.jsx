import Taro, { Component } from '@tarojs/taro'
import { AtList, AtListItem, AtPagination,AtMessage  } from 'taro-ui'
import './ItinerarySceneTab.less'
export default class ItinerarySceneTab extends Taro.Component {
    constructor(props) {
        super(props)
        this.state = {
            sceneData: [],
            current: 0,
            total: 0
        }
    }
    static options = {
        addGlobalClass: true
    }
    handleClick(e) {
        if (this.state.sceneData.length > 0) {
            Taro.navigateTo({
                url: '/pages/detail/sceneDetail/sceneDetail?kw='+this.state.sceneData[this.state.current-1].destination_name
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
        this.setState({
            sceneData: this.props.sceneData,
            current: (this.props.sceneData.length > 0) ? 1 : 0,
            total: (this.props.sceneData.length > 0) ? this.props.sceneData.length : 0
        }, () => {
            //console.log(this.state.sceneData)
        })
    }
    render() {
        const data = this.state.sceneData
        const current = this.state.current
        const total = this.state.total
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
                        note={(data.length > 0 && data[current - 1].destination_time) ? data[current - 1].destination_time : '无'}
                        thumb={require('../../../assets/img/时间.png')}>
                    </AtListItem>
                    <AtListItem
                        title='备注'
                        note={(data.length > 0 && data[current - 1].note) ? data[current - 1].note : '无'}
                        thumb={require('../../../assets/img/更多.png')}>
                    </AtListItem>
                    <AtListItem
                        onClick={this.handleClick.bind(this)}
                        title='景点信息'
                        arrow='right'
                        thumb={require('../../../assets/img/景点.png')}></AtListItem>
                </AtList>
                {this.state.total > 0 &&
                    <View className="tab-pagination">
                        <AtPagination total={total} pageSize={1} current={current}
                            onPageChange={this.handlePageChange.bind(this)}>
                        </AtPagination>
                    </View>}
            </View>
        )
    }
}