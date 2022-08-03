<template>
  <div class="mask" v-if="showCart" @click="changeShowCart"></div>
  <div class="cart">
    <div class="product" v-if="showCart">
      <div class="product__header">
        <template v-if="showCart && calculations.total > 0">
        <div class="product__header__all" @click="() => setItemCheck(shopId)">
                  <span class="product__header__checked iconfont"
          v-html="calculations.allChecked ? '&#xe652;' : '&#xe66c;'"
        ></span><div>全选</div></div>
        <div
          class="product__header__clear"
        ><span @click="() => cleanCartProducts(shopId)">清空购物车</span></div>
        </template>
      </div>
      <template  v-for="item in contentList" :key="item._id">
        <div v-if="item.count > 0" class="product__item">
          <div
            class="product__item__checked iconfont"
            v-html="item.checked ? '&#xe652;' : '&#xe66c;'"
            @click="() => changeCartItemCheck(shopId, item._id)"
          >
          </div>
          <img class="product__item__img" :src=item.imgUrl alt="">
          <div class="product__item__detail">
          <h4 class="product__item__title">{{ item.name }}</h4>
          <p class="product__item__price">
            <span class="product__item__yen">&yen; {{ item.price }}</span>
            <span class="product__item__origin">&yen;{{ item.oldPrice }}</span>
          </p>
        </div>
        <div class="product__number">
          <span class="product__number__minus"
            @click="() => { changeCartItemInfo(shopId, item._id, item, -1) }">-</span>
          <span class="product__number__num">
            {{ item.count || 0 }}
          </span>
          <span class="product__number__plus" @click="() => { changeCartItemInfo(shopId, item._id, item, 1) }">+</span>
        </div>
        </div>
      </template>
    </div>
    <div class="check">
      <div class="check__icon" @click="changeShowCart">
        <img src="http://www.dell-lee.com/imgs/vue3/basket.png" class="check__icon__img">
        <div class="check__icon__tag">{{ calculations.total }}</div>
      </div>
      <div class="check__info">
        总计：<span class="check__info__price">&yen;{{ calculations.price }}</span>
      </div>
      <div class="check__btn">
        <router-link :to="{ 'name': 'HomeView' }">去结算</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { computed } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import useCommonCartEffect from './commonCartEffect'
export default {
  name: 'CartView',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { cartList, changeCartItemInfo, store } = useCommonCartEffect()
    console.log(cartList)
    const calculations = computed(() => {
      const result = { total: 0, price: 0, allChecked: true }
      const productList = cartList[shopId]?.productList
      if (productList) {
        for (const i in productList) {
          const product = productList[i]
          result.total += product.count
          if (product.checked) {
            result.price += product.count * product.price
          }
          if (!product.checked && product.count > 0) {
            result.allChecked = false
          }
        }
      }
      result.price = result.price.toFixed(2)
      return result
    })

    const contentList = computed(() => {
      const productList = cartList[shopId]?.productList || []
      return productList
    })
    const setItemCheck = (shopId) => {
      store.commit('setItemCheck', { shopId })
    }
    const changeCartItemCheck = (shopId, productId) => {
      store.commit('changeCartItemCheck', { shopId, productId })
    }

    const cleanCartProducts = (shopId) => {
      store.commit('cleanCartProducts', { shopId })
    }

    const showCart = ref(false)
    const changeShowCart = () => {
      showCart.value = !showCart.value
    }
    return {
      calculations,
      contentList,
      shopId,
      showCart,
      changeCartItemInfo,
      changeCartItemCheck,
      cleanCartProducts,
      setItemCheck,
      changeShowCart
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../style/variables.scss';
@import '../../style/mixins.scss';
.mask {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.50);
  z-index: 1;
}
.cart {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: .5rem;
  border-top: 1px solid #F1F1F1;
  z-index: 2;
  background-color: #fff;
}

.product {
    position: absolute;
    bottom: .5rem;
    left: 0;
    right: 0;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #FFF;

    &__header {
      display: flex;
      line-height: .52rem;
      border-bottom: 1px solid #F1F1F1;
      padding: 0 .2rem 0 .17rem;
      &__all {
        display: flex;
        line-height: .5rem;
      }
      &__checked {
        display: inline-block;
        font-size: .20rem;
        // padding-top: .4rem;
        margin-right: .1rem;
        color: #0091FF;
      }
      &__clear {
        flex: 1;
        text-align: right;
      }
    }

    &__item {
        position: relative;
        display: flex;
        padding: .12rem 0;
        margin: 0 .16rem;
        border-bottom: 1px solid $content-bgcolor;

        &__checked {
          margin-right: .1rem;
          line-height: .5rem;
          color: #0091FF;
          font-size: .2rem;
        }

        &__img {
            width: .46rem;
            height: .46rem;
            margin-right: .16rem;
        }

        &__detail {
            overflow: hidden;
        }

        &__title {
            margin: 0;
            line-height: .2rem;
            font-size: .14rem;
            color: $content-fontcolor;
            @include ellipse;
        }

        &__price {
            margin: 0;
            line-height: .16rem;
            font-size: .12rem;
            color: $content-fontcolor;
        }

        &__yen {
            margin-right: .1rem;
            font-size: .14rem;
            color: $danger;
        }

        &__origin {
            color: black;
            text-decoration: line-through;
            font-size: .12rem;
            color: $light-fontColor;
        }
    }

    &__number {
        position: absolute;
        right: .1rem;
        bottom: .3rem;

        &__minus {
            display: inline-block;
            text-align: center;
            line-height: .18rem;
            width: .18rem;
            height: .18rem;
            border: .01rem solid black;
            border-radius: .09rem;
        }

        &__num {
            margin: 0 .1rem;
        }

        &__plus {
            display: inline-block;
            text-align: center;
            line-height: .2rem;
            width: .2rem;
            height: .2rem;
            background-color: #0091ff;
            color: $white;
            border-radius: .1rem;
        }
    }
}
.check {
  display: flex;

  &__icon {
    display: flex;
    width: .84rem;

    &__img {
      display: block;
      margin: .12rem auto;
      width: .28rem;
      height: .26rem;
    }

    &__tag {
      position: absolute;
      left: .45rem;
      top: .1rem;
      width: .24rem;
      height: .16rem;
      background-color: #e93b3b;
      border-radius: .08rem;
      text-align: center;
      line-height: .16rem;
      color: #fff;
    }
  }

  &__info {
    line-height: .48rem;
    flex: 1;
    font-size: .12rem;
    color: #333;

    &__price {
      color: #E93B3B;
      font-size: .18rem;
    }
  }

  &__btn {
    line-height: .48rem;
    width: .98rem;
    text-align: center;
    background-color: #4FB0F9;
    font-size: .14rem;
    a {
      text-decoration: none;
      color: #fff;
    }
  }
}
</style>
