<template>
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
        <img src="../../assets/banner.jpg" class="banner__img">
    </div>
    <div class="icons">
        <div class="icons__item" v-for="(item, index) in itemList" :key="index">
            <img :src="`http://www.dell-lee.com/imgs/vue3/${item.imgName}.png`" class="icons__item__img">
            <p class="icons__item__desc">{{ item.desc }}</p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'StaticPart',
  setup () {
    const itemList = [
      { imgName: '超市', desc: '超市便利' },
      { imgName: '菜市场', desc: '菜市场' },
      { imgName: '水果店', desc: '水果店' },
      { imgName: '鲜花', desc: '鲜花绿植' },
      { imgName: '医药健康', desc: '医药健康' },
      { imgName: '家居', desc: '家居时尚' },
      { imgName: '蛋糕', desc: '烘培蛋糕' },
      { imgName: '签到', desc: '签到' },
      { imgName: '大牌免运', desc: '大牌免运' },
      { imgName: '红包', desc: '红包套餐' }
    ]
    return { itemList }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/mixins.scss';

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
</style>
