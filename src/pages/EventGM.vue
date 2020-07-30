<template>
  <div>
    <h1>EVENT MANAGEMENT</h1>
    <el-button
      type="primary"
      @click="dialogFormAddVisible = true"
      style="margin-bottom: 15px"
      plain
    >Add new Event</el-button>

    <el-dialog title="Add new Event" :visible.sync="dialogFormAddVisible">
      <el-form :model="addEvent">
        <el-form-item label="Event Name" :label-width="formLabelWidth">
          <el-input v-model="addEvent.eventName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Group" :label-width="formLabelWidth">
          <el-select
            v-model="addEvent.groupName"
            placeholder="Please select a Group"
            style="float: left"
          >
            <el-option label="F-Code" value="1"></el-option>
            <el-option label="FPT Event Club" value="2"></el-option>
            <el-option label="FPT Instrument Club" value="3"></el-option>
            <el-option label="FPT Chess Club" value="4"></el-option>
            <el-option label="FPT Guitar Club" value="5"></el-option>
            <el-option label="FPT Vovinam Club" value="6"></el-option>
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
      :data="tableData.filter(data => !search || data.eventName.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column label="EventId" :min-width="40">
        <template slot-scope="scope">
          <span>{{ scope.row.eventId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Event Name" :min-width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.eventName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Group Name" :min-width="70">
        <template slot-scope="scope">
          <span>{{ scope.row.groupID}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Location" width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.location }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Time Occur" prop="timeOccur">
        <template slot-scope="scope">
          <span>{{ scope.row.timeOccur}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Create Date" prop="createDate">
        <template slot-scope="scope">
          <span>{{ scope.row.createDate}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="Modify Date">
        <template slot-scope="scope">
        <span>{{ scope.row.modifyDate }}</span>
      </template>
      </el-table-column>-->
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="Type to search" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-dialog title="Event Detail" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="Event Name" :label-width="formLabelWidth">
                <el-input v-model="form.eventName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="Group" :label-width="formLabelWidth">
                <el-select
                  v-model="form.groupName"
                  placeholder="Please select a Group"
                  style="float: left"
                >
                  <el-option label="F-Code" value="1" v-for="item in items" :key="item.id"></el-option>
                  <el-option label="FPT Event Club" value="2"></el-option>
                  <el-option label="FPT Instrument Club" value="3"></el-option>
                  <el-option label="FPT Chess Club" value="4"></el-option>
                  <el-option label="FPT Guitar Club" value="5"></el-option>
                  <el-option label="FPT Vovinam Club" value="6"></el-option>
                </el-select>
              </el-form-item>
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
              <el-button type="primary" @click="confirm(scope.$index, scope.row)">Confirm</el-button>
            </span>
          </el-dialog>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            style="margin-left: 10px"
          >Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row style="margin-top: 10px">
      <el-col :span="6" :offset="11">
        <el-button v-for="item in pagination"  :key="item.pageId"
                    :label="item.pageId"
                    :value="item.pageId" circle @click="paginationLoad(item.pageId)" type="success">{{item.pageId}}</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import Request from "../services/RequestBase.js";
import baseConfig from "../config";
const backendIp=baseConfig.backendIp;
export default {
  data() {
    return {
      pagination: [],
      totalPages: 0,
      tableData: [],
      dialogFormVisible: false,
      dialogFormAddVisible: false,
      form: {
        eventName: "",
        groupName: "",
        location: "",
        timeOccur: "",
        state: ""
      },
      addEvent: {
        eventName: "",
        groupName: "",
        location: "",
        timeOccur: ""
      },
      formLabelWidth: "120px",
      formLabelWidth1: "180px",
      search: "",
      editedIndex: -1,
      eventIdDelete: ""
    };
  },
  created: function() {
    const req = Request({
      headers: {
        Authentication: "asdasdadshkhhasd"
      }
    });

    let EventRepository = this.$repository.get("events");
    let UserRepository = this.$repository.get("users");
    let AuthRepository = this.$repository.get("auth");
    let CommentRepository = this.$repository.get("comments");
    let GroupRepository = this.$repository.get("groups");
    let NotificationRepository = this.$repository.get("notifications");
    let PostRepository = this.$repository.get("posts");
    let pageSize = 5
    new EventRepository(req)
      .get({pageSize})
      .then(rs => {
        this.tableData = rs.data.data;
        this.totalPages = rs.data.totalPages;
        for (let i = 0; i < this.totalPages; i++) {
          this.pagination.push({ pageId: i + 1, pageName: "page" });
        }
      })
      .catch(e => console.error(e));
  },
  mounted: {},
  methods: {
    paginationLoad(pageNumber) {
      const req = Request();
      let pageSize = 5;
      let EventRepository = this.$repository.get("events");
      new EventRepository(req)
        .get({ pageSize, pageNumber })
        .then(rs => {
          this.tableData = rs.data.data;
          console.log(this.tableData);
        })
        .catch(e => console.error(e));
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.editedIndex = this.tableData.indexOf(row);
      this.form.eventName = row.eventName;
      let groupNm = ""
      if(row.groupID === 1){
        this.groupNm = "F-Code"
      }
      else if(row.groupID === 2){
        this.groupNm = "FPT Event Club"
      }else if(row.groupID === 3){
        this.groupNm = "FPT Instrument Club"
      }else if(row.groupID === 4){
        this.groupNm = "FPT Chess Club"
      }else if(row.groupID === 5){
        this.groupNm = "FPT Guitar Club"
      }else if(row.groupID === 6){
        this.groupNm = "FPT Vovinam Club"
      }
      this.form.groupName = this.groupNm;
      this.form.location = row.location;
      this.form.timeOccur = row.timeOccur;
      console.log(this.editedIndex);
    },
    confirm(index, row) {
      var currentDate = new Date();
      var currentDateWithFormat = new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "-");
      this.dialogFormVisible = false;
      let eventEdit = this.tableData[this.editedIndex].eventId;
      let stateEdit = ""
      let groupNameEdit = ""
      if(this.form.groupName == "1"){
        this.groupNameEdit = 1
      }else if(this.form.groupName == "2"){
        this.groupNameEdit = 2
      }else if(this.form.groupName == "3"){
        this.groupNameEdit = 3
      }else if(this.form.groupName == "4"){
        this.groupNameEdit = 4
      }else if(this.form.groupName == "5"){
        this.groupNameEdit = 5
      }else if(this.form.groupName == "6"){
        this.groupNameEdit = 6
      }
      axios
        .patch(backendIp+`/api/events/` + eventEdit, {
          eventName: this.form.eventName,
          timeOccur: this.form.timeOccur,
          groupId: this.groupNameEdit,
          location: this.form.location
        })
        .then(response => {});
      this.tableData[this.editedIndex].eventName = this.form.eventName;
      this.tableData[this.editedIndex].groupID = this.groupNameEdit;
      this.tableData[this.editedIndex].location = this.form.location;
      this.tableData[this.editedIndex].timeOccur = this.form.timeOccur;
    },
    confirmAdd() {
      this.dialogFormAddVisible = false;
      var currentDate = new Date();
      var currentDateWithFormat = new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "-");
      this.dialogFormVisible = false;
      let groupNameAdd = ""
      if(this.addEvent.groupName == "1"){
        this.groupNameAdd = 1
      }else if(this.addEvent.groupName == "2"){
        this.groupNameAdd = 2
      }else if(this.addEvent.groupName == "3"){
        this.groupNameAdd = 3
      }else if(this.addEvent.groupName == "4"){
        this.groupNameAdd = 4
      }else if(this.addEvent.groupName == "5"){
        this.groupNameAdd = 5
      }else if(this.addEvent.groupName == "6"){
        this.groupNameAdd = 6
      }
      let groupId = this.groupNameAdd;
      let eventName = this.addEvent.eventName;
      let timeOccur = this.addEvent.timeOccur;
      let eventImageUrl = "";
      let location = this.addEvent.location;
      let createDate = currentDateWithFormat
        const req = Request({
        headers: {
          Authentication: "asdasdadshkhhasd"
        }
      });

      let EventRepository = this.$repository.get("events");
      let UserRepository = this.$repository.get("users");
      let AuthRepository = this.$repository.get("auth");
      let CommentRepository = this.$repository.get("comments");
      let GroupRepository = this.$repository.get("groups");
      let NotificationRepository = this.$repository.get("notifications");
      let PostRepository = this.$repository.get("posts");
        new EventRepository(req)
        .create({groupId, eventName, timeOccur, eventImageUrl, location})
        .then(rs => (
          this.tableData = rs.data.data
          ))
      // axios
      //   .post(`https://192.168.1.24:8083/api/events`, {
      //     groupId: this.groupId,
      //     eventName: this.eventName,
      //     timeOccur: this.timeOccur,
      //     eventImageUrl: this.eventImageUrl,
      //     location: this.location
      //   })
      //   .then(response => {
      //     // this.tableData = response.data.data
      //   });
      this.addEvent.eventName = "";
      this.addEvent.timeOccur = "";
      this.addEvent.groupName = "";
      this.addEvent.location = "";
      this.addEvent.image = "";
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
        .delete(backendIp+`/api/events/` + this.eventIdDelete)
        .then(response => {});
      this.tableData.splice(index, 1);
    },
    async loadBreweries() {
      const req = Request();
      let pageSize = 5;
      let pageNumber = this.currentPage;
      let EventRepository = this.$repository.get("events");
      new EventRepository(req)
        .get({ pageSize, pageNumber })
        .then(rs => {
          this.tableData = rs.data.data;
          console.log(this.tableData);
        })
        .catch(e => console.error(e));  
    },
    nextPage:function() {
      this.currentPage++;
      this.loadBreweries();
    },
    prevPage:function() {
      if(this.currentPage > 1) this.currentPage--;
      this.loadBreweries();
    }
  },
  created:function() {
    this.loadBreweries();
  },
  computed:{
    cantGoBack() {
      return this.currentPage === 1;
    }
  }
};
</script>