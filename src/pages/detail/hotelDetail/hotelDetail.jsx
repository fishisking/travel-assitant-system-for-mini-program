import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './hotelDetail.scss'
import { AtTag, AtRate } from 'taro-ui'
export default class hotelDetail extends Taro.Component {
    constructor() {
        super(...arguments)
    }
    config = {
        navigationBarTitleText: '酒店详情'
    }
    componentWillMount() {
        const kw = this.$router.params.kw
        Taro.request({
            url: 'http://api01.idataapi.cn:8000/hotel/idataapi?apikey=w9SJFPtGTXjLKLd2phP5ML5EamVQBUbFHS6B3cs2mw060BoTzZnHDyfoMpEc6zAp',
            data: {
                city: '杭州',
                kw
            },
            method: 'GET',
        }).then((res) => {
            this.setState({
                data: res.data.data[0]
            }, () => {
                console.log(res.data.data[0])

            })
        })
    }
    renderTags() {
        const { data } = this.state
        const tags = (data) ? data.tags : []
        if ((Array.isArray(tags)) && tags.length > 0) {
            return (
                <View className='at-article__p'>
                    <Text className="basic_information_title">特色标签\n</Text>
                    {tags.map((item, index) => {
                        return <AtTag circle className="information_tag">{item}</AtTag>
                    })}
                </View>
            )
        }
    }
    render() {

        const data = this.state.data
        return (
            <View>
                <View className='at-article'>
                    <View class="article_h1">
                        <View className="hotel_name">{data.title}</View>
                    </View>
                    <View className='at-article__info'>
                        {data.tipInfo && null}
                    </View>
                    <View className='at-article__content'>
                        <View className='at-article__section'>
                            <View className='at-article__h2'>基本信息</View>
                            <Image
                                className='at-article__img'
                                src={data.imageUrls[0]}
                                mode='widthFix' />
                            <View className='at-article__p'>
                                <Text className="basic_information_title">酒店星级:</Text>{`${data.level}`}
                            </View>
                            <View className='at-article__p'>
                                <Text className="basic_information_title">开业年份:</Text>{`${data.openDate}`}
                            </View>
                            <View className='at-article__p'>
                                <Text className="basic_information_title">最近装修年份:</Text>{`${data.decorationDate}`}
                            </View>
                            <View className='at-article__p'>
                                <Text className="basic_information_title">有无wifi:</Text>{data.hasWifi === 0 ? '有' : '无'}
                            </View>
                            <View className='at-article__p'>
                                <Text className="basic_information_title">营业时间:</Text>{data.openingHours}
                            </View>
                            {this.renderTags()}
                        </View>
                        <View className='at-article__section'>
                            <View className='at-article__h2'>酒店描述</View>
                            <View className='at-article__p introduction'>
                                {data.description}
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}