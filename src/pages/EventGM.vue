<template>
  <div>
    <h1>EVENT MANAGEMENT</h1>
    <el-button
      type="primary"
      @click="dialogFormAddVisible = true"
      style="margin-bottom: 15px"
      plain
      >Add new Event</el-button
    >

    <el-dialog title="Add new Event" :visible.sync="dialogFormAddVisible">
      <el-form :model="addEvent">
         <el-row type="flex" class="row-bg" justify="center">
                <el-form-item style="width:50%">
                <el-image style="width: 100%; " :fit="fit" v-if="addEvent.eventImageUrl===''">
                  <div slot="error" class="image-slot text-center" >
                    <i style="font-size:3rem" class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                
                  <img style="width: 100%;" :src="addEvent.eventImageUrl" />
                </el-form-item>
                
              </el-row>
              <label class="file-select" style="margin-left:80%">
                  <!-- We can't use a normal button element here, as it would become the target of the label. -->
                    <div class="select-button">
                    <!-- Display the filename if a file has been selected. -->
                      <span v-if="uploadingImage" style="padding: 1rem;color: white;background-color: #2EA169;border-radius: .3rem;text-align: center;font-weight: bold;">Selected image: {{uploadingImage.name}}</span>
                      <span v-else style="cursor:pointer;">Select File</span>
                    </div>
                  <!-- Now, the file input that we hide. -->
                  <input id="createventimageupload" ref="createventimageupload" accept="image/png,image/jpeg,image/jpg" style="display: none;" type="file" v-on:change="handleFileChangeOnCreateEvent"/>
                </label>
        <el-form-item label="Event Name" :label-width="formLabelWidth">
          <el-input v-model="addEvent.eventName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Group" :label-width="formLabelWidth">
          <el-select
            v-model="addEvent.groupId"
            placeholder="Please select a Group"
            style="float: left"
          >
            <el-option
              v-for="item in groupList"
              :key="item.groupId"
              :label="item.groupName"
              :value="item.groupId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Location" :label-width="formLabelWidth">
          <el-input v-model="addEvent.location" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="Image" :label-width="formLabelWidth">
          <div v-if="!image">
            <input type="file" @change="onFileChange()" />
          </div>
          <div v-else>
            <img :src="image"/>
            <button @click="removeImage()">Remove image</button>
          </div>
        </el-form-item>-->
        <el-form-item label="Time Occur" :label-width="formLabelWidth">
          <el-date-picker
            v-model="addEvent.timeOccur"
            type="datetime"
            placeholder="Select date and time"
          ></el-date-picker>
          <!-- <el-input v-model="addEvent.timeOccur" autocomplete="off"></el-input> -->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormAddVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirmAdd()">Confirm</el-button>
      </span>
    </el-dialog>

    <el-table
      :data="searchResult ? searchResult : tableData"
      style="width: 100%"
    >
      <!-- <el-table-column label="EventId" :min-width="50">
        <template slot-scope="scope">
          <span>{{ scope.row.eventId }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="Event Name" :min-width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.eventName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Group Name" :min-width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.groupName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Location" width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.location }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Time Occur" prop="timeOccur">
        <template slot-scope="scope">
          <span>{{ scope.row.timeOccur }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Status" :min-width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.approveState==-1?"Rejected":scope.row.approveState==0?"Pending":"Approved" }}</span>
        </template>
      </el-table-column>
       <el-table-column label="Image" prop="imageUrl">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleImage(scope.row.eventImageUrl)"
            >Show</el-button
          >
          <el-dialog title="Event Image" :visible.sync="imageDialogVisible">
            <el-form :model="dialogImage">
              <el-form-item>
                <el-image
                  style="width: 100%; "
                  :fit="fit"
                  v-if="dialogImage.imageUrl === ''"
                >
                  <div slot="error" class="image-slot text-center">
                    <i
                      style="font-size:3rem"
                      class="el-icon-picture-outline"
                    ></i>
                  </div>
                </el-image>

                <img style="width: 100%;" :src="dialogImage.imageUrl" />
                <span slot="title">adasdasd</span>
              </el-form-item>
            </el-form>
          </el-dialog>
        </template>
      </el-table-column>
      <el-table-column label="Create Date" prop="createDate">
        <template slot-scope="scope">
          <span>{{ scope.row.createDate }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="Modify Date">
        <template slot-scope="scope">
        <span>{{ scope.row.modifyDate }}</span>
      </template>
      </el-table-column>-->
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
<<<<<<< HEAD
          <el-input  v-model="search" v-on:change="onSearchInput(search)" size="mini" placeholder="Type to search" />
=======
          <el-input
            v-model="search"
            v-on:change="onSearchInput($event)"
            size="mini"
            placeholder="Type to search"
          />
>>>>>>> origin/AddMajorUpdate
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-dialog title="Event Detail" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-row type="flex" class="row-bg" justify="center">
                <el-form-item style="width:50%">
                  <el-image
                    style="width: 100%; "
                    :fit="fit"
                    v-if="form.eventImageUrl === ''"
                  >
                    <div slot="error" class="image-slot text-center">
                      <i
                        style="font-size:3rem"
                        class="el-icon-picture-outline"
                      ></i>
                    </div>
                  </el-image>

                  <img style="width: 100%;" :src="form.eventImageUrl" />
                </el-form-item>
              </el-row>
              <label class="file-select">
                <!-- We can't use a normal button element here, as it would become the target of the label. -->
                <div class="select-button">
                  <!-- Display the filename if a file has been selected. -->
                  <span
                    v-if="uploadingImage"
                    style="padding: 1rem;color: white;background-color: #2EA169;border-radius: .3rem;text-align: center;font-weight: bold;"
                    >Selected image: {{ uploadingImage.name }}</span
                  >
                  <span v-else style="cursor:pointer;">Select File</span>
                </div>
                <!-- Now, the file input that we hide. -->
                <input
                  id="eventimageupload"
                  ref="eventimageupload"
                  accept="image/png,image/jpeg,image/jpg"
                  style="display: none;"
                  type="file"
                  v-on:change="handleFileChange"
                />
              </label>
              <el-form-item label="Event Name" :label-width="formLabelWidth">
                <el-input
                  v-model="form.eventName"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <!-- <el-form-item label="Group" :label-width="formLabelWidth">
                <el-select
                  v-model="form.groupName"
                  placeholder="Please select a Group"
                  style="float: left"
                >
                  <el-option
                    v-for="item in groupList"
                    :key="item.groupId"
                    :label="item.groupName"
                    :value="item.groupId"
                  ></el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item label="Location" :label-width="formLabelWidth">
                <el-input v-model="form.location" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="Time Occur" :label-width="formLabelWidth">
                <el-date-picker
                  v-model="form.timeOccur"
                  type="datetime"
                  placeholder="Select date and time"
                ></el-date-picker>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">Cancel</el-button>
              <el-button
                type="primary"
                @click="confirm(scope.$index, scope.row)"
                >Confirm</el-button
              >
            </span>
          </el-dialog>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            style="margin-left: 10px"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-row style="margin-top: 10px" v-if="searchResult == null">
      <el-col :span="6" :offset="11">
        <el-button v-for="item in pagination"  :key="item.pageId"
                    :label="item.pageId"
                    :value="item.pageId" circle @click="paginationLoad(item.pageId)" type="success">{{item.pageId}}</el-button>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
import axios from "axios";
import Request from "../services/RequestBase.js";
import * as firebase from "firebase/app";
import "firebase/firebase-storage";
import baseConfig from "../config";
const backendIp = baseConfig.backendIp;
export default {
  data() {
    return {
      rsPage : 0,
      groupList: [],
      pagination: [],
      totalPages: 0,
      tableData: [],
      imageDialogVisible:false,
      dialogImage:{imageUrl:""},
      dialogFormVisible: false,
      dialogFormAddVisible: false,
      uploadingImage:"",
      form: {
        eventName: "",
        groupId: "",
        location: "",
        timeOccur: "",
        state: "",
        eventImageUrl:"",
        eventImageFile:"",
      },
      addEvent: {
        eventImageUrl:"",
        eventImageFile:"",
        groupId:"",
        eventName: "",
        groupName: "",
        location: "",
        timeOccur: ""
      },
      formLabelWidth: "120px",
      formLabelWidth1: "180px",
      search: "",
      editedIndex: -1,
      eventIdDelete: "",
      searchResult: null
    };
  },
  created: function() {
   this.initData();
  },
  mounted: {},
  methods: {
    paginationLoad(pageNumber) {
      const req = Request();
      let pageSize = 5;
      axios
        .get(backendIp+`/api/groups/1/events`, {
        })
        .then(rs => {
         if(this.searchResult === null){
            this.tableData = rs.data.data;
          }else{
            this.searchResult = rs.data.data;
          }
      })}, readAsync(blob) {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target.result);
      };
    reader.onerror = () => {
        reject (new Error ('Unable to read..'));
    };
    reader.readAsDataURL(blob);
  });
},
    async handleFileChange(){
        let file = this.$refs.eventimageupload.files[0];
        let resultData=await this.readAsync(file);
        this.form.eventImageUrl=resultData;
        this.form.eventImageFile=file;
      },
      async handleFileChangeOnCreateEvent(){
        let file = this.$refs.createventimageupload.files[0];
        let resultData=await this.readAsync(file);
        this.addEvent.eventImageUrl=resultData;
        this.addEvent.eventImageFile=file;
      },
    handleImage(imageUrl){
        this.imageDialogVisible=true;
        this.dialogImage.imageUrl=imageUrl;
        console.log(imageUrl,this.dialogImage)
    },
    initData(){
 let pageSize = 15;
    let userId = JSON.parse(localStorage.getItem("userInfo")).userId;
    axios
      .get(backendIp + `/api/users/${userId}/groupsubscriptions`, { pageSize })
      .then(rs => {
        let listSub = rs.data;
        let listAdminSub = listSub.filter(sub => sub.subscriptionType === 2);
        let eventsData = [];

        listAdminSub.forEach(sub => {
          let groupId = sub.groupId;
          let isAdded = false;
          axios
            .get(backendIp + `/api/groups/${groupId}/events`, { params:{pageSize ,approveState:2}})
            .then(rs => {
              let result = rs.data.data;
              result.forEach(event => {
                eventsData.push(event);
                if (!isAdded) {
                  this.groupList.push({
                    groupId:event.groupId,
                    groupName:event.groupName
                  });
                  isAdded=true;
                }
              });
            });
        });

        this.tableData = eventsData;
      });
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.editedIndex = this.tableData.indexOf(row);
      this.form.eventId = row.eventId;
      this.form.eventName = row.eventName;
      this.form.groupId = row.groupId;
      this.form.location = row.location;
      this.form.timeOccur = row.timeOccur;
      this.form.eventImageUrl = row.eventImageUrl;
    
    },
    async confirm(index, row) {
      
      this.dialogFormVisible = false;
      let {eventName,eventId,timeOccur,groupId,location} = this.form;
      let group=this.groupList.filter(item=>item.groupId===this.form.groupId)[0];
      let groupNameEdit = group.groupName;

      if(this.form.eventImageFile){
        try{
          var ref = firebase.storage().refFromURL("gs://fiep-e6602.appspot.com").child(`events/${this.form.eventImageFile.name}`);

          await ref.put(this.form.eventImageFile)
          let imageUrl=await ref.getDownloadURL();

          await axios.patch(backendIp + `/api/events/` + this.form.eventId, {
          eventName: this.form.eventName,
          timeOccur: this.form.timeOccur,
          groupId: this.form.groupId,
          location: this.form.location,
          eventImageUrl:imageUrl
        })
        this.tableData[this.editedIndex].eventName = this.form.eventName;
        this.tableData[this.editedIndex].groupId = this.form.groupId;
        this.tableData[this.editedIndex].groupName = groupNameEdit;
        this.tableData[this.editedIndex].location = this.form.location;
        this.tableData[this.editedIndex].timeOccur = this.form.timeOccur;
        this.tableData[this.editedIndex].eventImageUrl = imageUrl;
      this.tableData[this.editedIndex].eventImageUrl=imageUrl;

      this.$message(
        {
          message:`Edit event ${this.form.groupId} successfully`,
          type:"success"
        }
      )
      }catch(e){
        this.$message(
        {
          message:`Fail to update event ${this.form.groupId} `,
          type:"success"
        }
      )
      }
      }else{
          try{
          await axios.patch(backendIp + `/api/events/` + this.form.groupId, {
          eventName: this.form.eventName,
          timeOccur: this.form.timeOccur,
          groupId: this.form.groupId,
          location: this.form.location
        })
      this.tableData[this.editedIndex].eventName = this.form.eventName;
      this.tableData[this.editedIndex].groupId = this.form.groupId;
      this.tableData[this.editedIndex].groupName = groupNameEdit;
      this.tableData[this.editedIndex].location = this.form.location;
      this.tableData[this.editedIndex].timeOccur = this.form.timeOccur;
      this.$message(
        {
          message:`Edit event ${this.form.groupId} successfully`,
          type:"success"
        }
      )
      }catch(e){
        this.$message(
        {
          message:`Fail to update event ${this.form.groupId} `,
        }
      )
      }
      }
    },
    async confirmAdd() {
      this.dialogFormAddVisible = false;

      let {eventName,groupId,location,timeOccur,eventImageUrl,eventImageFile} = this.addEvent;

      let approveState = 0;

          
      const req = Request();
      let EventRepository = this.$repository.get("events");
      try{
      if(this.addEvent.eventImageFile){
        var ref = firebase.storage().refFromURL("gs://fiep-e6602.appspot.com").child(`events/${this.addEvent.eventImageFile.name}`);

          await ref.put(this.addEvent.eventImageFile);
          let imageUrl=await ref.getDownloadURL();

         await new EventRepository(req).create({ groupId, eventName, timeOccur, eventImageUrl:imageUrl, location });

      }else{
           await new EventRepository(req).create({ groupId, eventName, timeOccur, eventImageUrl:"", location });
      }
       this.$message({
         type:"success",
            message: `Create new event successfully!`
          });
      this.initData();


      }catch(e){
        console.log(e)
        this.$message({
            message: `Fail to create new event`
          });
      }
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = e => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function(e) {
      this.addEvent.image = "";
    },
    handleDelete(index, row) {
      this.eventIdDelete = row.eventId;
      axios
        .delete(backendIp + `/api/events/` + this.eventIdDelete)
        .then(response => {});
      this.tableData.splice(index, 1);
    },
    async onSearchInput(e){
      if(this.search === ""){
        this.rsPage = 1
      }else{
        this.rsPage = 0
      }
      try {
        let result=await axios.get(`${backendIp}/api/groups/1/events?query=${e}`);

        console.log(result);
        this.searchResult = result.data.data;
      } catch (error) {
        this.searchResult = null;
        console.log(error);
      }
    }
  }
};
</script>
