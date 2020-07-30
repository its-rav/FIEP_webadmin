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
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormAddVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirmAdd()">Confirm</el-button>
      </span>
    </el-dialog>
    <el-table
      :data="searchResult?searchResult:tableData"
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
    <el-row style="margin-top: 10px" v-if="searchResult == null || this.rsPage === 1">
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
      tableData: [],
      dialogFormVisible: false,
      dialogFormAddVisible: false,
      dialogCommentAddVisible: false,
      form: {
        eventName: "",
        postContent: ""
      },
      addPost: {
        postContent: "",
        eventName: ""
      },
      addComment: {
        content: "",
        postId: ""
      },
      formLabelWidth: "120px",
      formLabelWidth1: "180px",
      search: "",
      editedIndex: -1,
      postIdDelete: "",
      listEvent: [],
      pagination: [],
      totalPages: 0,
      searchResult: null,
      rsPage: 0,
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
    new PostRepository(req)
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
  },
  methods: {
    paginationLoad(pageNumber) {
      const req = Request();
      let pageSize = 5;
      let PostRepository = this.$repository.get("posts");
      new PostRepository(req)
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
    confirmAddComment() {
      this.dialogCommentAddVisible = false;
      axios
        .post(backendIp+`/api/comments`, {
          content: this.addComment.content,
          postId: this.addComment.postId,
          userId: "1D8C8527-E1F4-4A77-85EE-68C15F927817"
        })
        .then(response => {});
      this.addComment.content = "";
      this.addComment.postId = "";
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
    },
    async onSearchInput(e){
      if(this.search === ""){
        this.rsPage = 1
      }else{
        this.rsPage = 0
      }
      try {
        let result=await axios.get(`${backendIp}/api/posts?query=${e}`);
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