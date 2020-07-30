<template>
  <div>
    <h1>POST MANAGEMENT</h1>
    <el-button
      type="primary"
      @click="dialogFormAddVisible = true"
      style="margin-bottom: 15px"
      plain
    >Add Notification for Event</el-button>
<el-dialog title="Add Notification for Event" :visible.sync="dialogFormAddVisible">
      <el-form :model="addNotification">
        <el-form-item label="Title" :label-width="formLabelWidth">
          <el-input v-model="addNotification.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Content" :label-width="formLabelWidth">
          <el-input v-model="addNotification.content" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="EventId" :label-width="formLabelWidth">
          <el-select
            v-model="addNotification.eventName"
            placeholder="Please select a Event"
            style="float: left"
          >
          <el-option v-for="item in listEvent" :key="item.eventId" :label="item.eventName" :value="item.eventId"></el-option>
            <!-- <el-option label="ACM" value="1"></el-option>
            <el-option label="Tiktok conpetition" value="2"></el-option>
            <el-option label="Club celebration" value="3"></el-option>
            <el-option label="Guitar free style" value="4"></el-option>
            <el-option label="Reduce plastic together" value="5"></el-option>
            <el-option label="Martial art for women day" value="6"></el-option> -->
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormAddVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirmAdd()">Confirm</el-button>
      </span>
    </el-dialog>
    <el-button
      type="primary"
      @click="dialogGroupAddVisible = true"
      style="margin-bottom: 15px; margin-left: 15px"
      plain
    >Add Notification for Group</el-button>
<el-dialog title="Add Notification for Group" :visible.sync="dialogGroupAddVisible">
      <el-form :model="addNotificationGroup">
        <el-form-item label="Title" :label-width="formLabelWidth">
          <el-input v-model="addNotificationGroup.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Content" :label-width="formLabelWidth">
          <el-input v-model="addNotificationGroup.content" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="GroupId" :label-width="formLabelWidth">
          <el-select
            v-model="addNotificationGroup.groupName"
            placeholder="Please select a Group"
            style="float: left"
          >
          <el-option v-for="item in listGroup" :key="item.groupId" :label="item.groupName" :value="item.groupId"></el-option>
            <!-- <el-option label="F-Code" value="1"></el-option>
            <el-option label="FPT Event Club" value="2"></el-option>
            <el-option label="FPT Instrument Club" value="3"></el-option>
            <el-option label="FPT Chess Club" value="4"></el-option>
            <el-option label="FPT Guitar Club" value="5"></el-option>
            <el-option label="FPT Vovinam Club" value="6"></el-option> -->
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogGroupAddVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirmAddGroup()">Confirm</el-button>
      </span>
    </el-dialog>
    <el-table
      :data="searchResult?searchResult:tableData"
      style="width: 100%"
    >
    <el-table-column label="NotificationID" width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.notificationID}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Title" width="200px">
        <template slot-scope="scope">
          <span>{{ scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Body" :min-width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.body}}</span>
        </template>
      </el-table-column>
      <el-table-column label="EventId">
        <template slot-scope="scope">
          <span>{{ scope.row.eventId}}</span>
        </template>
      </el-table-column>
      <el-table-column label="GroupId">
        <template slot-scope="scope">
          <span>{{ scope.row.groupId}}</span>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input  v-model="search" v-on:change="onSearchInput(search)" size="mini" placeholder="Type to search" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-dialog title="Post Detail" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="Post Content" :label-width="formLabelWidth">
                <el-input v-model="form.postContent" autocomplete="off"></el-input>
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
    <el-row style="margin-top: 10px" v-if="searchResult == null|| this.rsPage === 1">
      <el-col :span="6" :offset="11">
        <el-button
          v-for="item in pagination"
          :key="item.pageId"
          :label="item.pageId"
          :value="item.pageId"
          circle
          @click="paginationLoad(item.pageId)"
          type="success"
        >{{item.pageId}}</el-button>
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
      searchResult: null,
      tableData: [],
      dialogFormVisible: false,
      dialogFormAddVisible: false,
      dialogGroupAddVisible: false,
      form: {
        eventName: "",
        postContent: ""
      },
      addNotification: {
        content: "",
        eventName: "",
        title: ""
      },
      addNotificationGroup: {
        content: "",
        title: "",
        groupName: ""
      },
      formLabelWidth: "120px",
      formLabelWidth1: "180px",
      search: "",
      editedIndex: -1,
      postIdDelete: "",
      listEvent: [],
      listGroup: [],
       pagination: [],
      totalPages: 0,
      rsPage : 0,
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
    new NotificationRepository(req)
      .get({pageSize})
      .then(rs => {
        this.tableData = rs.data.data;
        this.totalPages = rs.data.totalPages;
        for (let i = 0; i < this.totalPages; i++) {
          this.pagination.push({ pageId: i + 1, pageName: "page" });
        }
      })
      .catch(e => console.error(e));
    new EventRepository(req)
      .get()
      .then(rs => (this.listEvent = rs.data.data))
      .catch(e => console.error(e));
      new GroupRepository(req)
      .get()
      .then(rs => (this.listGroup = rs.data.data))
      .catch(e => console.error(e));
  },
  methods: {
    paginationLoad(pageNumber) {
      const req = Request();
      let pageSize = 5;
      let NotificationRepository = this.$repository.get("notifications");
      new NotificationRepository(req)
        .get({ pageSize, pageNumber })
        .then(rs => {
          if(this.searchResult === null){
            this.tableData = rs.data.data;
          }else{
            this.searchResult = rs.data.data;
          }
          console.log(this.tableData);
        })
        .catch(e => console.error(e));
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.editedIndex = this.tableData.indexOf(row);
      this.form.eventName = row.eventName;
      this.form.postContent = row.postContent;
    },
    // confirm(index, row) {
    //   var currentDate = new Date();
    //   var currentDateWithFormat = new Date()
    //     .toJSON()
    //     .slice(0, 10)
    //     .replace(/-/g, "-");
    //   this.dialogFormVisible = false;
    //   let postID = this.tableData[this.editedIndex].postID;
    //   axios
    //     .patch(`https://192.168.1.24:8083/api/posts/` + postID, {
    //       postContent: this.form.postContent
    //     })
    //     .then(response => {});
    //   this.tableData[this.editedIndex].postContent = this.form.postContent;
    //   var currentDate = new Date();
    //   var currentDateWithFormat = new Date()
    //     .toJSON()
    //     .slice(0, 10)
    //     .replace(/-/g, "-");
    //   this.dialogFormVisible = false;
    // },
    makeid(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 
  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
 
  return text;
},
    confirmAdd() {
      this.dialogFormAddVisible = false;
      var currentDate = new Date();
      var currentDateWithFormat = new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "-");
        let eventId1 = this.addNotification.eventName;
      let imageUrl1 ="";
      let content1 = this.addNotification.content;
      let title1 = this.addNotification.title;
      axios
        .put(backendIp+`/api/events/`+eventId1+`/notification`, {
          body: content1,
          title: title1,
        })
        .then(response => {});
      let PostDetail = {
        eventId: eventId1,
        title: title1,
        body: content1,
        notificationID: this.makeid(32),
      };
      this.tableData.push(PostDetail);
      this.addNotification.eventName = "";
      this.addNotification.content = "";
      this.addNotification.title = ""
    },
    confirmAddGroup() {
      this.dialogGroupAddVisible = false;
      let groupId1 = this.addNotificationGroup.groupName;
      let imageUrl1 ="";
      let content1 = this.addNotificationGroup.content;
      let title1 = this.addNotificationGroup.title;
      axios
        .put(backendIp+`/api/groups/`+groupId1+`/notification`, {
          body: content1,
          title: title1,
        })
        .then(response => {});
      let PostDetail1 = {
        groupId: groupId1,
        title: title1,
        body: content1,
        notificationID: this.makeid(32),
      };
      this.tableData.push(PostDetail1);
      this.addNotificationGroup.groupName = "";
      this.addNotificationGroup.content = "";
      this.addNotificationGroup.title = ""
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
      this.addPost.image = "";
    },
    handleDelete(index, row) {
      // this.postIdDelete = row.postID;
      // axios
      //   .delete(`https://192.168.1.24:8083/api/posts/` + this.postIdDelete)
      //   .then(response => {});
      // this.tableData.splice(index, 1);
    },
    async onSearchInput(e){
      if(this.search === ""){
        this.rsPage = 1
      }else{
        this.rsPage = 0
      }
      try {
        let result=await axios.get(`${backendIp}/api/notifications?query=${e}`);
      console.log(result);
        this.searchResult= result.data.data;
      } catch (error) {
        this.searchResult = null;
        console.log(error);
      }
    }
  }
};
</script>