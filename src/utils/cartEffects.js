import { computed } from 'vue'
import { useStore } from 'vuex'

// 购物车相关逻辑
const useCommonCartEffect = (shopId) => {
  const store = useStore()
  const cartList = store.state.cartList
  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    store.commit('changeCartItemInfo', {
      shopId, productId, productInfo, num
    })
  }
  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || []
    return productList
  })
  const shopName = computed(() => {
    const shopName = cartList[shopId]?.shopName || ''
    return shopName
  })
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
  return {
    cartList,
    store,
    productList,
    shopName,
    calculations,
    changeCartItemInfo
  }
}

export default useCommonCartEffect
