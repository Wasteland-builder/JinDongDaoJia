<template>
    <div class="docker">
        <span
            v-for="(docker, index) in dockerList"
            :key="index"
            :class="{'docker__item': true,'docker__item--active': index === 0}"
        >
            <router-link :to="docker.to">
            <div class="iconfont" v-html="docker.icon"></div>
            <div class="docker__title">{{docker.text}}</div>
            </router-link>
        </span>
    </div>
</template>

<script>
export default {
  name: 'DockerView',
  setup () {
    const dockerList = [
      { icon: '&#xe600;', text: '首页', to: { name: 'HomeView' } },
      { icon: '&#xe7e5;', text: '购物车', to: { name: 'CartList' } },
      { icon: '&#xe8ae;', text: '订单', to: { name: 'HomeView' } },
      { icon: '&#xe659;', text: '我的', to: { name: 'HomeView' } }
    ]
    return { dockerList }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/mixins.scss';

.docker {
    display: flex;
    position: absolute;
    box-sizing: border-box;
    padding: 0 .18rem;
    left: 0;
    bottom: 0;
    width: 100%;
    height: .49rem;
    border-top: .01rem solid $content-bgcolor;
    &__item {
        -webkit-tap-highlight-color: transparent; // 解决点击后背景颜色变化问题
        flex: 1;
        text-align: center;
        a {
            color: $content-fontcolor;
            text-decoration: none;
        }

        .iconfont {
            margin: .05rem .01rem;
            font-size: .18rem;
        }

        &__title {
            font-size: .1rem;
        }

        &--active {
            a {
                color: #1FA4FC;
            }
        }
    }
}
</style>
