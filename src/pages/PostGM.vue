<template>
  <div>
    <h1>POST MANAGEMENT</h1>
    <el-button
      type="primary"
      @click="dialogFormAddVisible = true"
      style="margin-bottom: 15px"
      plain
    >Add new Post</el-button>

    <el-dialog title="Add new Post" :visible.sync="dialogFormAddVisible">
      <el-form :model="addPost">
        <el-form-item label="Post Content" :label-width="formLabelWidth">
          <el-input v-model="addPost.postContent" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Event" :label-width="formLabelWidth">
          <el-select
            v-model="addPost.eventName"
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
        <!-- <el-form-item label="Image" :label-width="formLabelWidth">
          <div v-if="!image">
            <input type="file" @change="onFileChange()" />
          </div>
          <div v-else>
            <img :src="image"/>
            <button @click="removeImage()">Remove image</button>
          </div>
        </el-form-item>-->
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
    <el-table-column label="PostId" width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.postId}}</span>
        </template>
      </el-table-column>
      <el-table-column label="EventId" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.eventId}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Post Content" :min-width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.postContent}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Create Date">
        <template slot-scope="scope">
          <span>{{ scope.row.createDate}}</span>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="Type to search" />
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
      tableData: [],
      dialogFormVisible: false,
      dialogFormAddVisible: false,
      form: {
        eventName: "",
        postContent: ""
      },
      addPost: {
        postContent: "",
        eventName: ""
      },
      formLabelWidth: "120px",
      formLabelWidth1: "180px",
      search: "",
      editedIndex: -1,
      postIdDelete: "",
      listEvent: [],
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
    let pageSize = ""
    new PostRepository(req)
      .get()
      .then(rs => (this.tableData = rs.data.data))
      .catch(e => console.error(e));
      new EventRepository(req)
      .get()
      .then(rs => (this.listEvent = rs.data.data))
      .catch(e => console.error(e));
  },
  methods: {
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.editedIndex = this.tableData.indexOf(row);
      this.form.eventName = row.eventName;
      this.form.postContent = row.postContent;
    },
    confirm(index, row) {
      var currentDate = new Date();
      var currentDateWithFormat = new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "-");
      this.dialogFormVisible = false;
      let postId = this.tableData[this.editedIndex].postId;
      axios
        .patch(backendIp+`/api/posts/` + postId, {
          postContent: this.form.postContent
        })
        .then(response => {});
      this.tableData[this.editedIndex].postContent = this.form.postContent;
      var currentDate = new Date();
      var currentDateWithFormat = new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "-");
      this.dialogFormVisible = false;
    },
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
        let eventId1 = this.addPost.eventName;
      let imageUrl1 ="";
      let postContent1 = this.addPost.postContent;
      axios
        .post(backendIp+`/api/posts`, {
          postContent: postContent1,
          eventId: eventId1,
        })
        .then(response => {});
      let PostDetail = {
        eventId: eventId1,
        postContent: postContent1,
        createDate: currentDateWithFormat,
        postId: this.makeid(32),
      };
      this.tableData.push(PostDetail);
      this.addPost.eventName = "";
      this.addPost.postContent = "";
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
      this.postIdDelete = row.postId;
      axios
        .delete(backendIp+`/api/posts/` + this.postIdDelete)
        .then(response => {});
      this.tableData.splice(index, 1);
    }
  }
};
</script>