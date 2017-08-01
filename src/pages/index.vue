<template>
  <router-view></router-view>
  </div>
</template>
<script>
import appNav from '@/components/nav/nav';
export default {
  data() {
      return {
        msg: '',
      }

    },
    created() {

    },
    methods: {

    }
}
</script>
<style scoped>

.fade-enter-active,
.fade-leave-active {
  opacity: 1;
  transition: opacity .3s
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
