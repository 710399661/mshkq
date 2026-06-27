<template>
  <div class="site-function-set-box">
    <Card>
      <CardRow class="publishing-title other">
        其它功能
      </CardRow>
    </Card>

    <!-- <Card>
      <CardRow
        class="card-points"
        description="开启后，用户角色将可以配置价格和有效期，用户可在前台进行用户角色购买"
      >
        <el-checkbox v-model="purchase">权限购买功能</el-checkbox>
      </CardRow>
    </Card> -->
    <Card>
      <CardRow
        class="card-points"
        description="关闭后，这些功能将无法在站内使用。(仅限小程序)"
      >
        <el-checkbox v-model="reward">打赏、悬赏、红包、匿名、私信、商品、帖子付费、用户组付费、充值，提现</el-checkbox>
      </CardRow>
    </Card>
   
   <Card class="recharge-points">
      <div class="recharge-points__lf">
        <el-checkbox v-model="recharge">充值</el-checkbox>
      </div>
      <div class="recharge-points__rf">
        <p>开启后，用户可在站内自主充值钱包余额。</p>
        <p>根据相关规定，开启自动充值功能站长需先取得ICP增值业务许可证，请确保已获取相关资质后开启本功能，否则责任自负</p>
      </div>
    </Card>

    <el-button type="primary" size="medium" @click="handlePublishingSubmit">提交</el-button>

  </div>
</template>

<script>
  import "../../../../scss/site/module/globalStyle.scss";
  import siteFunctionSetCon from "../../../../controllers/site/global/siteSet/siteFunctionSetCon";
  export default {
    name: "site-function-set-view",
    ...siteFunctionSetCon
  };
</script>