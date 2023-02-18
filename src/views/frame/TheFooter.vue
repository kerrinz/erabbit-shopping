<template>
  <div class="footer_end">
    <footer class="page-container">
      <div class="columns_function">
        <ul>
          <li>服务保障</li>
          <li>隐私政策</li>
          <li>正品保障</li>
          <li>七天无理由退</li>
          <li>运费险</li>
          <li>延保服务</li>
        </ul>
        <ul>
          <li>购物指南</li>
          <li>常见问题</li>
          <li>购物流程</li>
          <li>团购指引</li>
          <li>配送与验收</li>
          <li>联系客服</li>
        </ul>
        <ul>
          <li>售后服务</li>
          <li>售后政策</li>
          <li>价格保护</li>
          <li>退款说明</li>
          <li>返修/退换货</li>
          <li>取消订单</li>
        </ul>
        <ul>
          <li>与我们联系</li>
          <li>关于我们</li>
          <li>商务合作</li>
          <li>销售联盟</li>
          <li>友情链接</li>
        </ul>
      </div>
      <el-divider style="border-color: #555" />
      <div class="copyright">
        <a href="https://github.com/yleencc/erabbit-shopping" target="_blank">Github</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.footer_end {
  background-color: #333;
  padding: 2em 0;
  .columns_function {
    display: flex;
    justify-content: space-around;
    margin-bottom: 2em;
    > ul {
      width: 200px;
      > li {
        display: block;
        font-size: 14px;
        color: #aaa;
        line-height: 24px;
        padding: 3px 0;
        &:first-child {
          font-size: 16px;
          color: #eee;
        }
      }
    }
  }
  .copyright {
    text-align: center;
    margin-top: 1em;
    a {
      color: #bbb;
      transition: color.2s;
      &:hover {
        color: #fff;
      }
    }
  }
}
</style>
