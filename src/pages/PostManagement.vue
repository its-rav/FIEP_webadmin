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
            <el-option label="ACM" value="1"></el-option>
            <el-option label="Tiktok conpetition" value="2"></el-option>
            <el-option label="Club celebration" value="3"></el-option>
            <el-option label="Guitar free style" value="4"></el-option>
            <el-option label="Reduce plastic together" value="5"></el-option>
            <el-option label="Martial art for women day" value="6"></el-option>
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
    <el-button
      type="primary"
      @click="dialogCommentAddVisible = true"
      style="margin-bottom: 15px; margin-left: 20px"
      plain
    >Add new Comment</el-button>
    <el-dialog title="Add new Comment" :visible.sync="dialogCommentAddVisible">
      <el-form :model="addComment">
        <el-form-item label="Content" :label-width="formLabelWidth">
          <el-input v-model="addComment.content" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Event" :label-width="formLabelWidth">
          <el-select
            v-model="addComment.postID"
            placeholder="Please select a Post"
            style="float: left"
          >
            <el-option label="Hey hey hey" value="5f22c086-1259-46a2-b5c8-6b68eb41b784"></el-option>
            <el-option label="Một tấm hình đẹp kỉ niệm event lần này" value="97da7c08-78a8-4c18-bca3-422c42f7778a"></el-option>
            <el-option label="Các bạn đã chuẩn bị tới đâu rồi nào" value="a67e6424-c865-4e13-b271-d8ac9a337517"></el-option>
            <el-option label="Luôn có đồ ăn trưa cho các nhé hehe !" value="88e898ce-d163-4873-8943-c0f828b92d33"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCommentAddVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirmAddComment()">Confirm</el-button>
      </span>
    </el-dialog>
    <el-table
      :data="tableData.filter(data => !search || data.eventName.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
    <el-table-column label="PostId" width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.postID}}</span>
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
        postID: ""
      },
      formLabelWidth: "120px",
      formLabelWidth1: "180px",
      search: "",
      editedIndex: -1,
      postIdDelete: ""
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
      let postID = this.tableData[this.editedIndex].postID;
      axios
        .patch(`https://192.168.1.24:8083/api/posts/` + postID, {
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
        .post(`https://192.168.1.24:8083/api/posts`, {
          postContent: postContent1,
          eventId: eventId1,
        })
        .then(response => {});
      let PostDetail = {
        eventId: eventId1,
        postContent: postContent1,
        createDate: currentDateWithFormat,
        postID: this.makeid(32),
      };
      this.tableData.push(PostDetail);
      this.addPost.eventName = "";
      this.addPost.postContent = "";
    },
    confirmAddComment() {
      this.dialogCommentAddVisible = false;
      axios
        .post(`https://192.168.1.24:8083/api/comments`, {
          content: this.addComment.content,
          postID: this.addComment.postID,
          userId: "1D8C8527-E1F4-4A77-85EE-68C15F927817"
        })
        .then(response => {});
      this.addComment.content = "";
      this.addComment.postID = "";
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
      this.postIdDelete = row.postID;
      axios
        .delete(`https://192.168.1.24:8083/api/posts/` + this.postIdDelete)
        .then(response => {});
      this.tableData.splice(index, 1);
    }
  }
};
</script>