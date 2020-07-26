<template>
  <card>
    <h5 slot="header" class="title">Edit Profile</h5>
    <div class="row">
      <div class="col-md-6 pr-md-1">
        <base-input label="Project"
                  placeholder="FIEP"
                  
                  disabled>
        </base-input>
      </div>
      <div class="col-md-6 pl-md-1">
        <base-input label="Email address"
                  type="email"
                  v-model="model.mail"
        >
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 pr-md-1">
        <base-input label="Full Name"
                  v-model="model.fullName"
                  placeholder="Fullname">
        </base-input>
      </div>
      <!-- <div class="col-md-6 pl-md-1">
        <base-input label="Last Name"
                  v-model="model.lastName"
                  placeholder="Last Name">
        </base-input>
      </div> -->
    </div>
    <div class="row">
      <div class="col-md-12">
        <base-input label="Address"
                  v-model="model.address"
                  placeholder="Home Address">
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 pr-md-1">
        <base-input label="City"
                  v-model="model.city"
                  placeholder="City">
        </base-input>
      </div>
      <div class="col-md-4 px-md-1">
        <base-input label="Country"
                  v-model="model.country"
                  placeholder="Country">
        </base-input>
      </div>
      <div class="col-md-4 pl-md-1">
        <base-input label="Postal Code"
                  placeholder="ZIP Code">
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8">
        <base-input>
          <label>About Me</label>
          <textarea rows="4" cols="80"
                    class="form-control"
                    placeholder="Here can be your description"
                    v-model="model.about">

              </textarea>
        </base-input>
      </div>
    </div>
    <base-button slot="footer" type="primary" fill>Save</base-button>
  </card>
</template>
<script>
import { mapGetters } from 'vuex'
  export default {
    props: {
      model: {
        type: Object,
        default: () => {
          return {};
        }
      }
    }
  }
</script>
<style>
</style>
