import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTag, AtRate } from 'taro-ui'
import './sceneDetail.scss'
import {formatSceneStyle} from '../../../utils/index'
export default class sceneDetail extends Component {
  constructor() {
    this.state.data = {}
  }

  componentWillMount() {
    const kw = this.$router.params.kw
    Taro.request({
      url: 'http://192.168.192.194:8088/keshe1/api/getSceneByKw',
      data: {
        kw
      },
      method: 'GET',
    }).then((res) => {
      let data = res.data[0]
      data['scene_note'] = this.convertNoteToArray(data['scene_note'])
      this.setState({
        data
      }, () => {
        console.log(data)
      })
    })
  }
  convertNoteToArray(note) {
    if (typeof note === 'string') {
      const reg = /\d+\./
      note = note.replace(/\s+/g, '')
      return note.split(reg).slice(1)
    } else {
      return note
    }

  }
  componentDidMount() { }
  config = {
    navigationBarTitleText: '景点详情'
  }

  render() {
    const data = this.state.data
    return (
      <View>
        <View className='at-article'>
          <View class="article_h1">
            <View className="scene_name">{data.scene_name}</View>
            <Text className='scene_tag'>{formatSceneStyle(data.scene_type_id)}</Text>
          </View>
          <View className='at-article__info'>
            {data.scene_short_info}
          </View>
          <View className='at-article__content'>
            <View className='at-article__section'>
              <View className='at-article__h2'>基本信息</View>
              <View className='at-article__p'>
                <View className="star">
                  <AtRate
                    value={data.avg_score}
                  />
                  <Text className="star_text">{`${data.avg_score}(${data.comment_number}人评)`}</Text>
                </View>

              </View>
              <View className='at-article__p'>
                <Text className="basic_information_title">开放时间:</Text>{`${data.opening_hours}`}
              </View>
              <View className='at-article__p'>
                <Text className="basic_information_title">景点地址:</Text>{`${data.scene_location}`}
              </View>
              <View className='at-article__p'>
                <AtTag circle className="information_tag">{data.popularity >= 3 ? '人气火爆' : '人气一般'}</AtTag>
                {data.scene_level && <AtTag circle className="information_tag">{data.scene_level}</AtTag>}
                <AtTag circle className="information_tag">{data.scene_free === 0 ? '收费' : '免费'}</AtTag>
              </View>
            </View>
            <View className='at-article__section'>
              <View className='at-article__h2'>景点介绍</View>
              <Image
                className='at-article__img'
                src={data.scene_img_src}
                mode='widthFix' />
              <View className='at-article__p scene_introduction'>
                {data.scene_detail_info}
              </View>
            </View>
            <View className='at-article__section'>
              <View className='at-article__h2'>{(data['scene_note'] && data['scene_note'].length > 0) ? '注意事项' : null}</View>
              {data.scene_note.map((item, index) => {
                return <View className='at-article__p'>{`${index + 1}.${item}`}\n</View>
              })}
            </View>
          </View>
        </View>
      </View>
    )
  }
}
