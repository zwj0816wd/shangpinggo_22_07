<template>
  <div>
    <h2>自定义带Hover提示的按钮</h2>
    <el-button type="primary" size="default" @click="">添加</el-button>
    
    <!-- 二次封装的HintButton按钮的时候，把人家el-button需要的数据传递过去 -->
  </div>
</template>

<script type="text/ecmascript-6">
import HintButton from './HintButton';
export default {
  name: 'AttrsListenersTest',
  components: {
    HintButton
  },
  methods: {

  },
}
</script>
