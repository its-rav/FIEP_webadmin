<template>
  <div class="logo">
    <div class="logo-img" :class="{ 'logo-img-rtl': $rtl.isRTL }">
    
    
      <img
        src="@/assets/fiep-logo.png"
      />
      
    </div>
    <h4 class="simple-text logo-normal logo-title">
      {{ title }}
    </h4>
  </div>
</template>

<script>
export default {
  name: "logo",
  props: {
    title: {
      type: String,
      default: "FIEP Admin Panel"
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo-title {
  position:absolute;
  bottom:0;
  text-align:center;
  left:0;
  right:0;
}
</style>
