import Taro from '@tarojs/taro'
import { AtForm, AtInput, AtButton, AtMessage } from 'taro-ui'
import './LoginBox.less'
export default class Index extends Taro.Component {
  constructor() {
    super(...arguments)
    this.state = {
      account: 100038,
      password: 123456
    }
  }
  handleChange(value, e) {
    const input_name = e.target.id
    this.setState({
      [input_name]: value
    })
  }
  onSubmit(event) {
    Taro.request({
      url: 'http://192.168.192.194:8088/keshe1/api/logOn',
      data: {
        user_id: this.state.account,
        password: this.state.password,
        yzm: '1234'
      },
      method: 'GET',
    }).then((res) => {
      if (typeof res.data === 'object') {
        //1.保存登录状态  2.消息提示 3.页面跳转
        Taro.atMessage({
          'message': '登录成功',
          'type': 'success',
        })
        Taro.navigateTo({
          url: '/pages/itinerary/itinerary?user_id=' + res.data.user_id
        })
      }
    })

  }
  onReset(event) {
    this.setState({
      account: '',
      password: ''
    })
  }
  render() {
    return (
      <View className="loginbox-container">
        <AtMessage />
        <Image src={require('../assets/img/logo.jpg')} className="logo-image"></Image>
        <AtForm
          className="login-form"
          onSubmit={this.onSubmit.bind(this)}
          onReset={this.onReset.bind(this)}
        >
          <AtInput
            name='account'
            title='账号'
            type='text'
            placeholder='请输入账号'
            value={this.state.account}
            onChange={this.handleChange.bind(this)}
          />
          <AtInput
            name='password'
            title='密码'
            type='text'
            placeholder='请输入密码'
            value={this.state.password}
            onChange={this.handleChange.bind(this)}
          />
          <AtButton formType='submit'>提交</AtButton>
          <AtButton formType='reset'>重置</AtButton>
        </AtForm>
      </View>
    )
  }
}