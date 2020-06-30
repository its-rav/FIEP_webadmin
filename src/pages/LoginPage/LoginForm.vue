<template>
  <card class="px-4 pt-5 pb-3">
    <form @submit.prevent="pressed">
      <base-input label="Email address" type="email" placeholder="Enter email">
        <!--<small slot="helperText" id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>-->
      </base-input>
      <base-input label="Password" type="password"  placeholder="Password">
      </base-input>
      <!--<base-checkbox>
            Option one is this 
        </base-checkbox>-->
      <base-button
        class="d-block align-middle mx-auto"
        native-type="submit"
        type="primary"
        >Login</base-button
      >
    </form>
    <p class="w-100 text-center mt-3 text-muted form-text">or</p>
    <div class="social">
      <div class="row justify-content-center">
        <a id="google_login" class="circle google" @click.prevent="googleSignin">
          <font-awesome-icon :icon="ggIcon" />
        </a>
        <a id="facebook_login" class="circle facebook" @click.prevent="facebookSignin">
          <font-awesome-icon :icon="fbIcon" />
        </a>
      </div>
    </div>
  </card>
</template>
<script>
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import * as firebase from "firebase/app"
import "firebase/auth";

export default {
  props: {
    model: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  computed: {
    fbIcon() {
      return faFacebook;
    },
    ggIcon() {
      return faGoogle;
    }
  },
  methods: {
    pressed(){
      alert("press");
    },
    googleSignin(){
      const provider=new firebase.auth.GoogleAuthProvider();

      firebase.auth().signInWithPopup(provider).then(result=>{

        this.$notify({
          message:"Success"
        });

      }).catch(err=>{

        this.$notify({
          message:"Error"
        });

      })
    },
    facebookSignin(){
      const provider=new firebase.auth.FacebookAuthProvider();

      firebase.auth().signInWithPopup(provider).then(result=>{

        this.$notify({
          message:"Success"
        });

      }).catch(err=>{

        this.$notify({
          message:"Error"
        });

      })
    }
  },
};
</script>
<style scope>
.social {
  float: none;
  margin:20px 0 auto ;
  text-align: center;
}

.social .circle {
  background-color: #eeeeee;
  color: #ffffff;
  border-radius: 100px;
  display: inline-block;
  margin: 0 17px;
  width: 3vw;
  height: 3vw;
  vertical-align: center;
  display: -webkit-flex; /* Safari */
  display: flex;
  -webkit-align-items: center; /* Safari 7.0+ */
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
}
.circle svg {
  color: #ffffff;
}
.social .circle {
  font-size: 1vw;
}
.social .facebook {
  background-color: #455ca8;
  color: #ffffff;
}
.social .google {
  background-color: #f74933;
}
.facebook:hover {
  background-color: #6e83cd;
}
.google:hover {
  background-color: #ff7566;
}
</style>
