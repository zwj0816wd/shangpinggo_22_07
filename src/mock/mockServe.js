//引入mockjs模块
import Mock from 'mockjs'

//webpack默认暴露的有：图片，JSON数据格式
import banner from './banner.json'
import floor from './floor.json'


Mock.mock('/mock/banner', { code: 200, data: banner })
Mock.mock('/mock/floor', { code: 200, data: floor })