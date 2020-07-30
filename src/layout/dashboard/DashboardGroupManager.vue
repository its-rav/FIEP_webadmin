<template>
  <div class="wrapper">
    <side-bar title="FIEP Group Manager">
      <template slot="links">
        <sidebar-link to="/eventGM" :name="$t('event management')" icon="tim-icons icon-pin"/>
        <sidebar-link to="/postGM" :name="$t('post management')" icon="tim-icons icon-bell-55"/>
        <sidebar-link to="/myprofile" :name="$t('profile')" icon="tim-icons icon-badge"/>
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
