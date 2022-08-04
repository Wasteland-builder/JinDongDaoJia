<template>
  <div class="wrapper">
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
    <div class="products">
      <div class="products__title">
        {{ shopName }}
      </div>
      <div class="products__list">
        <template
          v-for="product in productList"
          :key="product._id">
        <div
          class="products__list__item"
          v-if="product.count > 0"
        >
          <img class="products__list__item__img" :src="product.imgUrl">
          <div class="products__list__item__detail">
            <h4 class="products__list__item__title">{{ product.name }}</h4>
            <div class="products__list__item__price">
              <div class="products__list__item__yen">&yen; {{ product.price }} × {{ product.count }}</div>
              <div class="products__list__item__total">&yen; {{ (product.price * product.count).toFixed(2) }}</div>
            </div>
          </div>
        </div>
        </template>

      </div>
    </div>
    <div class="order">
      <div class="order__price">实付金额<span> ¥{{ calculations.price }}</span></div>
      <div class="order__btn">提交订单</div>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import useCommonCartEffect from '../../utils/cartEffects'
export default {
  name: 'OrderConfirmation',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const shopId = route.params.id
    const { productList, shopName, calculations } = useCommonCartEffect(shopId)
    const handleBackClick = () => {
      router.back()
    }
    return { productList, shopName, calculations, handleBackClick }
  }
}
</script>

<style scoped lang="scss">
@import '../../style/variables.scss';
@import '../../style/mixins.scss';
.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #eee;
}

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

.products {
  margin: .16rem .18rem .6rem .18rem;
  max-height: calc(100% - 2.8rem);
  overflow-y: scroll;
  background-color: #fff;
  &__title {
    padding: .16rem 0 0 .16rem;
    font-size: .16rem;
    color: #333333;
  }
  &__list {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;

    &__item {
        position: relative;
        display: flex;
        padding: .12rem 0;
        margin: 0 .16rem;

        &__img {
            width: .46rem;
            height: .46rem;
            margin-right: .16rem;
        }

        &__detail {
          flex: 1;
        }

        &__title {
            margin: 0;
            line-height: .2rem;
            font-size: .14rem;
            font-weight: 400;
            color: #333;
            color: $content-fontcolor;
        }

        &__price {
            display: flex;
            margin-top: .06rem;
            line-height: .16rem;
            font-size: .12rem;
            color: $content-fontcolor;
        }

        &__yen {
            font-size: .14rem;
            color: $danger;
        }

        &__total {
          flex: 1;
          text-align: right;
        }
    }
  }
}

.order {
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  line-height: .5rem;
  background-color: #fff;
  &__price {
    flex: 1;
    padding-left: .24rem;
    font-size: .14rem;
    span {
      padding-left: .05rem;
      font-size: .16rem;
      font-weight: 700;
      color: #151515;
    }
  }
  &__btn {
    // text-align: right;
    width: .98rem;
    text-align: center;
    background: #4FB0F9;
    font-size: .14rem;
    color: #FFF;
  }
}
</style>
