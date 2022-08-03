<template>
    <div class="content">
        <div class="category">
            <div
                :class="{
                  'category__item': true,
                  'category__item--active': currentTab === item.tab
                }"
                v-for="item in CATEGORIES"
                :key="item.name"
                @click="() => handleCategoryClick(item.tab)"
            >{{ item.name }}</div>
        </div>
        <div class="product">
            <div class="product__item"
            v-for="item in contentList"
            :key="item._id">
                <img class="product__item__img" :src=item.imgUrl alt="">
                <div class="product__item__detail">
                    <h4 class="product__item__title">{{item.name}}</h4>
                    <p class="product__item__sales">月售 {{item.sales}} 件</p>
                    <p class="product__item__price">
                        <span class="product__item__yen">&yen; {{item.price}}</span>
                        <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
                    </p>
                </div>
                <div class="product__number">
                    <span
                      class="product__number__minus"
                      @click="() => { changeCartItemInfo(shopId, item._id, item, -1) }"
                    >-</span>
                    <span class="product__number__num">
                        {{ cartList?.[shopId]?.[item._id]?.count || 0}}
                    </span>
                    <span
                      class="product__number__plus"
                      @click="() => { changeCartItemInfo(shopId, item._id, item, 1) }"
                    >+</span>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import store from '@/store'
import { reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { get } from '../../utils/request'

const CATEGORIES = [
  { name: '全部商品', tab: 'all' },
  { name: '秒杀', tab: 'seckill' },
  { name: '新鲜水果', tab: 'fruit' }
]
const useCartEffect = () => {
  const store = useStore()
  const { cartList } = toRefs(store.state)
  return { cartList }
}

export default {
  name: 'ContentView',
  setup () {
    const data = reactive({ contentList: [], currentTab: CATEGORIES[0].tab })

    const route = useRoute()

    const getContentData = async (tab) => {
      const result = await get(`/api/shop/${route.params.id}/products`, { tab })
      if (result?.errno === 0 && result?.data?.length) {
        data.contentList = result.data
      }
    }
    const shopId = route.params.id
    const handleCategoryClick = (tab) => {
      getContentData(tab)
      data.currentTab = tab
    }
    getContentData('all')
    const { contentList, currentTab } = toRefs(data)

    const { cartList } = useCartEffect()

    const changeCartItemInfo = (shopId, productId, productInfo, num) => {
      store.commit('changeCartItemInfo', {
        shopId, productId, productInfo, num
      })
    }
    return {
      contentList,
      CATEGORIES,
      handleCategoryClick,
      changeCartItemInfo,
      currentTab,
      cartList,
      shopId
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../style/variables.scss';
@import '../../style/mixins.scss';

.content {
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    top: 1.3rem;
    bottom: .5rem;
}

.category {
    overflow-y: scroll;
    // height: 100%;
    width: .76rem;
    background-color: $search-bgcolor;

    &__item {
        line-height: .4rem;
        text-align: center;
        font-size: .14rem;
        color: $content-fontcolor;

        &--active {
            background-color: $white;
        }
    }
}

.product {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;

    &__item {
        position: relative;
        display: flex;
        padding: .12rem 0;
        margin: 0 .16rem;
        border-bottom: 1px solid $content-bgcolor;

        &__img {
            width: .68rem;
            height: .68rem;
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

        &__sales {
            margin: .02rem 0 .05rem 0;
            line-height: .2rem;
            font-size: .12rem;
            color: $content-fontcolor;
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
        bottom: .12rem;

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
</style>
