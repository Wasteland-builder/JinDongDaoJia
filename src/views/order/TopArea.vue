<template>
      <div class="top">
      <div class="top__header">
        <div class="iconfont top__header__back" @click="handleBackClick">&#xe7e0;</div>
        确认订单
      </div>
      <div class="top__receiver">
        <div class="top__receiver__title">收货地址</div>
        <div class="top__receiver__address">北京理工大学国防科技园2号楼10层</div>
        <div class="top__receiver__info">
          <div class="top__receiver__info__name">瑶妹（先生）</div>
          <div class="top__receiver__info__phone">18911024266</div>
        </div>
        <div class="iconfont top__receiver__enter">&#xe662;</div>
      </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'TopArea',
  setup () {
    const router = useRouter()
    const handleBackClick = () => {
      router.back()
    }
    return { handleBackClick }
  }
}
</script>

<style scoped lang="scss">
.top {
  position: relative;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 1.96rem;
  background-size: 100% 1.59rem;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0.00) 4%, #0091FF 50%);
  background-repeat: no-repeat;

  &__header {
    position: relative;
    padding-top: .26rem;
    line-height: .24rem;
    color: #fff;
    text-align: center;
    font-size: .16rem;

    &__back {
      position: absolute;
      margin-left: .18rem;
      font-size: .22rem;
    }
  }

  &__receiver {
    position: relative;
    box-sizing: border-box;
    position: absolute;
    padding: .16rem;
    left: .18rem;
    right: .18rem;
    top: .86rem;
    bottom: 0;
    background: #FFFFFF;
    border-radius: .04rem;

    &__title {
      font-size: .16rem;
      color: #333;
      margin-bottom: .14rem;
    }

    &__address {
      margin-bottom: .1rem;
      font-size: .14rem;
    }

    &__info {
      display: flex;
      font-size: .12rem;
      color: #666;
    }

    &__enter {
      position: absolute;
      top: .4rem;
      right: .1rem;
      color: #666;
    }
  }
}
</style>
