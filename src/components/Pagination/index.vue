<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="getPageOn(pageNo - 1)">
      上一页
    </button>
    <!--  -->
    <button v-if="startPageAndEndPage.start > 1" @click="getPageOn(1)">
      1
    </button>
    <button v-if="startPageAndEndPage.start > 2">···</button>
    <button
      v-for="page in startPageAndEndPage.end"
      :key="page"
      v-if="page >= startPageAndEndPage.start"
      @click="getPageOn(page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>
    <button v-if="startPageAndEndPage.end < totalPage - 1">···</button>
    <button
      :class="{ active: pageNo == totalPage }"
      v-if="startPageAndEndPage.end < totalPage"
      @click="getPageOn(totalPage)"
    >
      {{ totalPage }}
    </button>
    <button :disabled="pageNo == totalPage" @click="getPageOn(pageNo + 1)">
      下一页
    </button>
    <button style="margin-left: 30px">共{{ total }} 条</button>
  </div>
</template>
<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  data() {
    return {};
  },
  computed: {
    //总页数
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    //起始页和结束页
    startPageAndEndPage() {
      let start = 0;
      let end = 0;
      /* if (this.continues >= this.totalPage) {
                start = 1
                end = this.totalPage
            } else if (this.pageNo > Math.floor(this.continues / 2)) {
                start = this.pageNo - Math.floor(this.continues / 2)
                if (this.pageNo > (this.totalPage - Math.floor(this.continues / 2))) {
                    end = this.totalPage
                } else {
                    end = this.pageNo + Math.floor(this.continues / 2)
                }
            } else {
                start = 1
                end = this.continues
            } */
      if (this.totalPage <= this.continues) {
        //如果总页码小于连续页码
        start = 1;
        end = this.totalPage;
      } else {
        ////如果总页码不小于连续页码
        start = this.pageNo - Math.floor(this.continues / 2);
        end = this.pageNo + Math.floor(this.continues / 2);
        //因为开始页码最小为1，所以当它小于1时重新修改它的值
        if (start < 1) {
          start = 1;
          end = this.continues;
        }
        //因为终止页码不能大于总页码，所以当它大于总页码时重新修改它的值
        if (end > this.totalPage) {
          start = this.totalPage - this.continues + 1;
          end = this.totalPage;
        }
      }
      return { start, end };
    },
  },
  methods: {
    //获取当前页
    getPageOn(pageNo) {
      this.$emit("getPageNo", pageNo);
    },
  },
};
</script>
<style lang="less" scoped>
.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      //cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
