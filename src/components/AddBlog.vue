<template>
  <div class="allblog">
    <div class="blogcontent">
      <!-- 使用双向绑定修饰符 -->
      <mavon-editor style="height: 100%" :subfield="true" :ishljs="true" :toolbarsFlag="true" :editable="true" :toolbars="toolbars" @save="$save" @imgAdd="$imgAdd" @imgDel="$imgDel" v-model="value"></mavon-editor>
      <el-button type="primary" class="publish" size="large" v-on:click="publish">发布博客</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      img_file: {},
      value: '',
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        subfield: true, // 是否需要分栏
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: false, // 展示html源码
        help: true, // 帮助
        /* 新增 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: false // 保存（触发events中的save事件）
      }
    }
  },
  methods: {
    $save: function() {
      console.log(this.value);
    },
    $imgAdd: function(pos, $file) {
      this.img_file[pos] = $file;
    },
    $imgDel: function(pos) {
      delete this.img_file[pos];
    },
    uploadimg: function(resolve,reject) {
      var self = this
      // upload files in one request.
      console.log(this.img_file);
      var formdata = new FormData();
      for (var _img in this.img_file) {
        formdata.append(_img, this.img_file[_img]);
      }
      jQuery.ajax({
        url: self.$commonConfig + "/net/image/upload",
        type: 'POST',
        data: formdata,
        // 告诉jQuery不要去处理发送的数据
        processData: false,
        // 告诉jQuery不要去设置Content-Type请求头
        contentType: false,
        beforeSend: function() {
          console.log("正在进行，请稍候")
        },
        success: function(responseStr) {
          if (responseStr.status === 200) {
            resolve(responseStr.data)
          } else {
            reject(responseStr.msg)
          }
        },
        error: function(responseStr) {
          reject('上传失败')
        }
      });
    },
    replaceValue:function(data){
      for(var key in data){
        this.value = this.value.replace(key,data[key])
      }
    },
    publish: function() {
      var self = this
      new Promise(this.uploadimg).then((data)=>{
          self.replaceValue(data)
          console.log(self.value)

      }).catch((error)=>{
          console.log(error)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.blogcontent {
  height: 650px;
  padding: 20px 50px;
}

.publish {
  margin-top: 50px;
}
</style>
