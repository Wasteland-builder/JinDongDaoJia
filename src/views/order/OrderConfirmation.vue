<template>
  <div class="wrapper">
    <top-area />
    <product-list />
    <div class="order">
      <div class="order__price">实付金额<span> ¥{{ calculations.price }}</span></div>
      <div class="order__btn">提交订单</div>
    </div>
  </div>
  <div class="mask">
    <div class="mask__content">
      <h3 class="mask__content__title">确认要离开收银台？</h3>
      <p class="mask__content__desc">请尽快完成支付，否则将被取消</p>
      <div class="mask__content__btns">
        <div class="mask__content__btn mask__content__btn--cancel" @click="handleConfirmOrder(false)">取消订单</div>
        <div class="mask__content__btn mask__content__btn--confirm" @click="handleConfirmOrder(true)">确认支付</div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { post } from '../../utils/request'
import useCommonCartEffect from '../../utils/cartEffects'
import TopArea from './TopArea.vue'
import ProductList from './ProductList.vue'
import useAddressEffect from './addressEffect'

const useMakeOrderEffect = (shopId, shopName, productList, address) => {
  const store = useStore()
  const router = useRouter()
  const handleConfirmOrder = async (isCanceled) => {
    const products = []
    for (const i in productList.value) {
      const product = productList.value[i]
      products.push({ id: product._id, num: product.count })
    }
    try {
      const result = await post('/api/order', {
        addressId: address.value._id,
        shopId,
        shopName: shopName.value,
        isCanceled,
        products
      })
      if (result?.errno === 0) {
        store.commit('clearCartData11', shopId)
        router.push({ name: 'OrderList' })
      }
    } catch (e) {
      console.log(e)
      // 提示下单失败
    }
  }
  return { handleConfirmOrder }
}

export default {
  name: 'OrderConfirmation',
  components: {
    TopArea,
    ProductList
  },
  setup () {
    const route = useRoute()

    const shopId = route.params.id

    const address = useAddressEffect()
    const { productList, shopName, calculations } = useCommonCartEffect(shopId)
    const { handleConfirmOrder } = useMakeOrderEffect(shopId, shopName, productList, address)

    return { productList, shopName, calculations, handleConfirmOrder }
  }
}
</script>

<style scoped lang="scss">
@import '../../style/variables.scss';

.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #eee;
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

.mask {
  z-index: 1;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.50);

  &__content {
    position: absolute;
    box-sizing: border-box;
    padding: .24rem .5rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3rem;
    height: 1.7rem;
    text-align: center;
    background-color: #FFF;

    &__title {
      font-size: .18rem;
    }

    &__desc {
      font-size: .14rem;
      color: #666;
    }

    &__btns {
      display: flex;
      justify-content: space-between;
    }

    &__btn {
      width: .8rem;
      height: .32rem;
      border: 1px solid #4FB0F9;
      border-radius: .16rem;
      line-height: .32rem;

      &--cancel {
        color: #4FB0F9;
      }

      &--confirm {
        color: #FFFFFF;
        background-color: #4FB0F9;
      }
    }
  }
}
</style>
