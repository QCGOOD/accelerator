<template>
  <div>
    <section class="remark">
      <divider>留言</divider>
      <div class="remark__title">
        <span>所有留言</span>
        <span style="color: #bb9d70;" @click="showComment()">我要留言</span>
      </div>
      <ul class="remark__detail">
        <li class="remark__list" v-for="(list) in comments" :key="list.id">
          <div class="headimg">
            <img :src="list.memberHeadImage" alt="" srcset="">
          </div>
          <div class="content">
            <section class="info">
              <div class="unt">
                <p>{{list.memberName}}</p>
                <p>{{list.createTime}}</p>
              </div>
              <p class="menu" @click="showComment(list)">
                <i class="iconfont icon-pingluncu"></i>
                回复
              </p>
            </section>
            <p class="text">{{list.content}}</p>
            <ul class="reply" v-if="list.subComments">
              <li v-for="child in list.subComments" :key="child.id">
                <span>{{child.memberName}}：</span>
                {{child.content}}
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </section>
    <div class="comment" v-if="commentWarp">
      <input v-focus v-model="commentModel.content" :placeholder="commentModel.placeholder" @blur="commentWarp = false" type="text">
      <x-button class="btn-send" :disabled="sendLock" @click.native="saveComment">{{commentModel.parentId ? '回复' :'评论'}}</x-button>
    </div>
  </div>
</template>

<script>
import { Divider, XButton } from "vux";

export default {
  components: {
    Divider,
    XButton
  },
  props: {
    // 消息是否需要审核
    isEnableCommentAudit: {
      type: Boolean,
      default: false
    },
    // 获取评论的id
    sourceId: String
  },
  data() {
    return {
      sendLock: false,
      commentWarp: false,
      comments: [],
      commentModel: {
        sourceId: "",
        sourceType: 1,
        content: "",
        parentId: ""
      }
    };
  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function(el) {
        el.focus();
      }
    }
  },
  created() {
    this.apiGetComment(this.sourceId);
  },
  methods: {
    // 获取评论
    apiGetComment(sourceId) {
      let auditStatus = this.isEnableCommentAudit ? "2" : "1";
      this.$http.get("/comment/page", { sourceId, auditStatus }).then(res => {
        this.comments = res.data.data.list;
      });
    },
    // 发评论
    apiSaveComment(model) {
      this.sendLock = true;
      this.$http
        .post("/comment/insert", model)
        .then(res => {
          this.commentWarp = false;
          this.apiGetComment(model.sourceId);
        })
        .catch(err => {
          this.toast(err.data.message);
        })
        .finally(() => {
          this.sendLock = false;
        });
    },
    // 发评论
    showComment(list) {
      this.commentModel.sourceId = "";
      this.commentModel.parentId = "";
      this.commentModel.content = "";
      this.commentModel.placeholder = "请输入...";
      if (list) {
        this.commentModel.sourceId = list.sourceId;
        this.commentModel.parentId = list.id;
        this.commentModel.placeholder = `回复:${list.memberName}`;
      } else {
        this.commentModel.sourceId = this.sourceId;
      }
      this.commentWarp = true;
    },
    saveComment() {
      this.apiSaveComment(this.commentModel);
    }
  }
};
</script>

<style lang="less" scoped>
.remark {
  li {
    list-style: none;
  }
  padding: 6vw 4vw;
  &__title {
    margin: 15px 0 25px;
    display: flex;
    justify-content: space-between;
    font-size: 3.5vw;
  }

  &__list {
    display: flex;
    margin-bottom: 3.7vw;
    .headimg {
      width: 10vw;
      height: 10vw;
      margin-right: 15px;
      border-radius: 50%;
      overflow: hidden;
    }
    .content {
      flex: 1;
      padding-bottom: 3.3vw;
      border-bottom: 1px solid #e0e0e0;
      .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .unt {
          p:first-child {
            font-size: 3.5vw;
          }
          p:last-child {
            font-size: 2.9vw;
            color: #999;
          }
        }
        .menu {
          font-size: 3.5vw;
          color: #999;
          .iconfont {
            vertical-align: middle;
            color: #000;
          }
        }
      }
    }
    .text {
      padding-top: 2vw;
      font-size: 3.5vw;
      color: #444;
    }
    .reply {
      margin-top: 2vw;
      padding: 1.9vw;
      font-size: 3.5vw;
      color: #333;
      background: #ebebeb;
      span {
        color: #999;
      }
    }
  }
}
.comment {
  position: fixed;
  width: 100%;
  bottom: 0;
  display: flex;
  background: #fff;
  z-index: 10;
  height: 56px;
  & > input {
    flex: 1;
    padding: 10px;
    margin: 10px;
    border: none;
    outline: none;
    border-radius: 2px;
    background: #eee;
  }
  .btn-send {
    width: 60px;
    height: 36px;
    padding: 0;
    margin: 10px 10px 10px 0;
    font-size: 14px;
    border: none;
    background: #e2513c;
    color: #fff;
    border-radius: 3px;
  }
}
</style>
