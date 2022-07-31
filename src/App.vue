<template>
  <div class="wrapper">
    <div class="position">
      <span class="iconfont position__icon">&#xe630;</span>
      北京理工大学国防科技园2号楼10层
      <span class="iconfont position__notice">&#xe679;</span>
    </div>
    <div class="search">
      <span class="iconfont search__position">&#xe86e;</span>
      山姆会员商店优惠商品
    </div>
    <div class="banner">
      <img src="./assets/banner.jpg" class="banner__img">
    </div>
    <div class="icons">
      <div class="icons__item">
        <img src="./assets/超市.png" class="icons__item__img">
        <p class="icons__item__desc">超市便利</p>
      </div>
      <div class="icons__item">
        <img src="./assets/菜市场.png" class="icons__item__img">
        <p class="icons__item__desc">菜市场</p>
      </div>
      <div class="icons__item">
        <img src="./assets/水果店.png" class="icons__item__img">
        <p class="icons__item__desc">水果店</p>
      </div>
      <div class="icons__item">
        <img src="./assets/鲜花.png" class="icons__item__img">
        <p class="icons__item__desc">鲜花绿植</p>
      </div>
      <div class="icons__item">
        <img src="./assets/医药健康.png" class="icons__item__img">
        <p class="icons__item__desc">医药健康</p>
      </div>
      <div class="icons__item">
        <img src="./assets/家居.png" class="icons__item__img">
        <p class="icons__item__desc">家具时尚</p>
      </div>
      <div class="icons__item">
        <img src="./assets/蛋糕.png" class="icons__item__img">
        <p class="icons__item__desc">烘焙蛋糕</p>
      </div>
      <div class="icons__item">
        <img src="./assets/签到.png" class="icons__item__img">
        <p class="icons__item__desc">签到</p>
      </div>
      <div class="icons__item">
        <img src="./assets/大牌免运.png" class="icons__item__img">
        <p class="icons__item__desc">大牌免运</p>
      </div>
      <div class="icons__item">
        <img src="./assets/红包.png" class="icons__item__img">
        <p class="icons__item__desc">红包套餐</p>
      </div>
    </div>
    <div class="gap"></div>
  </div>
  <div class="docker">
    <span class="docker__item docker__item--active">
      <div class="iconfont">&#xe600;</div>
      <div class="docker__title">首页</div>
    </span>
    <span class="docker__item">
      <div class="iconfont">&#xe7e5;</div>
      <div class="docker__title">购物车</div>
    </span>
    <span class="docker__item">
      <div class="iconfont">&#xe8ae;</div>
      <div class="docker__title">订单</div>
    </span>
    <span class="docker__item">
      <div class="iconfont">&#xe659;</div>
      <div class="docker__title">我的</div>
    </span>
  </div>
</template>

<style lang="scss">
@import './style/variables.scss';
@import './style/mixins.scss';

.wrapper {
  position: absolute;
  left: 0;
  top: 0;
  bottom: .5rem;
  right: 0;
  padding: 0 .18rem;

  .position {
    @include ellipse;
    position: relative;
    margin-right: .04rem;
    padding: .16rem 0;
    line-height: .22rem;
    font-size: .16rem;

    color: $content-fontcolor;

    &__icon {
      font-size: .18rem;
      // margin-right: .08rem;
    }

    .position__notice {
      position: absolute;
      top: .18rem;
      right: 0;
    }
  }

  .search {
    vertical-align: center;
    line-height: .32rem;
    background-color: #F5F5F5;
    color: #B7B7B7;
    border-radius: .16rem;
    font-size: .14rem;
    margin-bottom: .1rem;

    .search__position {
      margin-left: 0.15rem;
      margin-right: 0.15rem;
    }
  }

  .banner {
    &__img {
      width: 100%;
    }
  }

  .icons {
    display: flex;
    flex-wrap: wrap;
    margin-top: .16rem;

    &__item {
      width: 20%;

      &__img {
        display: block;
        width: .4rem;
        height: .4rem;
        margin: 0 auto;
      }

      &__desc {
        margin: .06rem 0 .16rem 0;
        text-align: center;
        color: $content-fontcolor;
      }
    }
  }

  .gap {
    height: .1rem;
    margin: 0 -.18rem;
    background-color: $content-bgColor;
  }
}

.docker {
  display: flex;
  position: absolute;
  box-sizing: border-box;
  padding: 0 .18rem;
  left: 0;
  bottom: 0;
  width: 100%;
  height: .49rem;
  border-top: .01rem solid $content-bgColor;
  color: $content-fontcolor;

  &__item {
    flex: 1;
    text-align: center;

    .iconfont {
      margin: .05rem .01rem;
      font-size: .18rem;
    }

    &__title {
      font-size: .1rem;
    }
  }

  &__item--active {
    color: #1FA4FC;
  }
}
</style>
