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
  import { mapGetters, mapState } from 'vuex'
  export default {
    components: {
      EditProfileForm,
      UserCard
    },
    computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      'getfullName',
      'getEmail',
      // ...
    ]),
    ...mapState([
      'fullName',
      'email',
      // ...
    ]),
      getName(){
        return this.getfullName
      },
      getEmailFromLogin(){
        return this.getEmail
      }
    },
    data() {
      return {
        model: {
          company: 'Creative Code Inc.',
          mail: this.getName(),
          fullName: this.getEmailFromLogin(),
          address: 'Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09',
          city: 'Melbourne',
          country: 'Australia',
          about: 'Lamborghini Mercy, Your chick she so thirsty, I\'m in that two seat Lambo.'
        },
        user: {
          fullName: "Than Quoc Binh",
          title: 'Ceo/Co-Founder',
          description: `Do not be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...`,
        }
      }
    },
  }
</script>
<style>
</style>
