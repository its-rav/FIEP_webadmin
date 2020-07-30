<template>
  <div class="row">
    <div class="col-md-8">
      <edit-profile-form :model="model"></edit-profile-form>
    </div>
    <div class="col-md-4">
      <user-card :user="user"></user-card>
    </div>
  </div>
</template>
<script>
  import EditProfileForm from './Profile/EditProfileForm';
  import UserCard from './Profile/UserCard'
  import axios from "axios";
  import Request from "../services/RequestBase.js";
  import { mapGetters } from 'vuex'
  export default {
    components: {
      EditProfileForm,
      UserCard
    },
    methods:{
      getUserInfo(){
          return this.$store.getters.getUserInfo;
      }
    },
    computed: {
    
    // getFullName1(){
    //   return "abcdef"
    // }
    },
    created(){
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      console.log(userInfo)
      this.user={
        fullName:userInfo.fullName,
        title:userInfo.role.toUpperCase(),
        avatarUrl:userInfo.avatarUrl
      };
      this.model={
          company: '',
          mail: userInfo.mail,
          fullName: userInfo.fullName,
          address: userInfo.role.toUpperCase(),
          city: '',
          country: '',
          about: ''
      }
    },
    data() {
      return {
        model: {
          company: '',
          mail: '',
          fullName: '',
          address: '',
          city: '',
          country: '',
          about: ''
        },
        user: {
          fullName: "",
          title: '',
          description: ``,
        }
      }
    },
  }
</script>
<style>
</style>
