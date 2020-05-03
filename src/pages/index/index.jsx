import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'
import LoginBox from '../../Components/LoginBox.jsx'
export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '首页'
  }

  render () {
    return (
      <View className='index'>
        <LoginBox></LoginBox>
      </View>
    )
  }
}
