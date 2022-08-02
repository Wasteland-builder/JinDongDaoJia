<template>
  <div class="wrapper">
    <static-part></static-part>
    <div class="gap"></div>
    <near-by></near-by>
  </div>
  <docker-view></docker-view>
</template>

<script>
import StaticPart from './StaticPart.vue'
import NearBy from './NearBy.vue'
import DockerView from './DocderView.vue'
export default {
  name: 'HomeView',
  components: {
    StaticPart,
    NearBy,
    DockerView
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';

.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: .5rem;
  padding: 0 .18rem;

  .gap {
    height: .1rem;
    margin: 0 -.18rem;
    background-color: $content-bgcolor;
  }
}
</style>
