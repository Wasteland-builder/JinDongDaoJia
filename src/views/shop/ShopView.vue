<template>
<div class="wrapper">
    <div class="search">
        <div
            class="search__back iconfont"
            @click="handleBackClick"
        >&#xe7e0;</div>
        <div class="search__content">
            <span class="search__content__icon iconfont">&#xe86e;</span>
            <input class="search__content__input" placeholder="请输入商品名称搜索"/>
        </div>
    </div>
    <ShopInfo :item="item" :hideBorder="true" v-show="item.imgUrl "></ShopInfo>
    <ContentView></ContentView>
    <CartView></CartView>
</div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import ShopInfo from '../../components/ShopInfo.vue'
import ContentView from './ContentView.vue'
import CartView from './CartView.vue'
import { get } from '../../utils/request'
import { useRouter, useRoute } from 'vue-router'

// 获取当前商铺信息
const useShopInfoEffect = () => {
  const route = useRoute()
  const data = reactive({ item: {} })
  const getItemData = async () => {
    const result = await get(`/api/shop/${route.params.id}`)
    if (result?.errno === 0 && result?.data) {
      data.item = result.data
    }
  }
  const { item } = toRefs(data)
  return { item, getItemData }
}
export default {
  name: 'ShowView',
  components: { ShopInfo, ContentView, CartView },
  setup () {
    const router = useRouter()

    const { item, getItemData } = useShopInfoEffect()
    getItemData()
    const handleBackClick = () => {
      router.back()
    }
    return { item, handleBackClick }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
    margin: 0 .18rem;
}
.search {
    display: flex;
    margin: .14rem 0 .04rem 0;
    line-height: .32rem;
    &__back {
        margin-right: .1rem;
        font-size: .2rem;
        color: #b6b6b6;
    }
    &__content {
        display: flex;
        flex: 1;
        background: #F5F5F5;
        border-radius: .16rem;
        &__icon {
            margin: 0 .1rem 0 .16rem;
            font-size: .18rem;
        }
        &__input {
            display: block;
            width: 100%;
            padding-right: .2rem;
            border: none;
            background: none;
            outline: none;
            height: .32rem;
            &::placeholder {
                font-size: .14rem;
                color: #333333;
            }
        }
    }
}
</style>
