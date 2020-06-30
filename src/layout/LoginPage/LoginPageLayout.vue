<template>
  <div class="wrapper d-flex align-items-center">
    <div class="col">
      <div class="row w-100 mx-auto justify-content-center">
        <div class="col-lg-2 col-md-3 col-sm-3 text-center">
          <logo />
        </div>
      </div>

      <div class="row w-100 mx-auto justify-content-center">
        <div class="col-lg-4 col-md-6 col-sm-12 mx-0 px-0">
          <router-view></router-view>
        </div>
      </div>

    </div>
  </div>
</template>
<style scope>
</style>
<script>
import Logo from "@/components/Logo";
export default {
  props: {},
  components: {
    Logo
  },
  methods: {}
};
</script>
