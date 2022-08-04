<template>
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
</template>

<script>
import { useRoute } from 'vue-router'
import useCommonCartEffect from '../../utils/cartEffects'
export default {
  name: 'ProductList',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { productList, shopName } = useCommonCartEffect(shopId)
    return { productList, shopName }
  }
}
</script>

<style scoped lang="scss">
@import '../../style/variables.scss';
@import '../../style/mixins.scss';
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
</style>
