<template>
    <div class="docker">
        <span
            v-for="(docker, index) in dockerList"
            :key="index"
            :class="{'docker__item': true,'docker__item__active': index === 0}"
        >
            <div class="iconfont" v-html="docker.icon"></div>
            <div class="docker__title">{{docker.text}}</div>
        </span>
    </div>
</template>

<script>
export default {
  name: 'DockerView',
  setup () {
    const dockerList = [
      { icon: '&#xe600;', text: '首页' },
      { icon: '&#xe7e5;', text: '购物车' },
      { icon: '&#xe8ae;', text: '订单' },
      { icon: '&#xe659;', text: '我的' }
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
    color: $content-fontcolor;

    &__item {
        flex: 1;
        text-align: center;

        .iconfont {
            margin: .05rem .01rem;
            font-size: .18rem;
        }

        &__title {
            font-size: .1rem;
        }
    }

    &__item__active {
        color: #1FA4FC;
    }
}
</style>
