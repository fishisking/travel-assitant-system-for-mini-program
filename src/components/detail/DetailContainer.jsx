import Taro, { Component } from '@tarojs/taro'
import './DetailContainer.scss'
import { AtTag,AtRate } from 'taro-ui'
export default class DetailContainer extends Taro.Component{
    constructor () {
        super(...arguments)
    }
    
    render(){    
        const data = this.props.data 
        return (
            <View>
                123
            </View>
        )
    }
}