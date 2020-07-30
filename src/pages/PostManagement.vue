<template>
  <div>
    <h1>POST MANAGEMENT</h1>
    <el-button
      type="primary"
      @click="dialogFormAddVisible = true"
      style="margin-bottom: 15px"
      plain
      >Add new Post</el-button
    >
    <el-dialog title="Add new Post" :visible.sync="dialogFormAddVisible">
      <el-form :model="addPost">
        <el-row type="flex" class="row-bg" justify="center">
                <el-form-item style="width:50%">
                <el-image style="width: 100%; " :fit="fit" v-if="addPost.imageUrl===''">
                  <div slot="error" class="image-slot text-center" >
                    <i style="font-size:3rem" class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                
                  <img style="width: 100%;" :src="addPost.imageUrl" />
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
                  <input id="createpostimageupload" ref="createpostimageupload" accept="image/png,image/jpeg,image/jpg" style="display: none;" type="file" v-on:change="handleFileChangeOnCreatePost"/>
                </label>
        <el-form-item label="Post Content" :label-width="formLabelWidth">
          <el-input v-model="addPost.postContent" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Event" :label-width="formLabelWidth">
          
          <el-select
            v-model="addPost.eventId"
            placeholder="Please select a Event"
            style="float: left"
          >
            <el-option
              v-for="item in listEvent"
              :key="item.eventId"
              :label="item.eventName"
              :value="item.eventId"
            ></el-option>
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
      @click="dialogCommentAddVisible = true"
      style="margin-bottom: 15px; margin-left: 20px"
      plain
      >Add new Comment</el-button
    >
    <el-dialog title="Add new Comment" :visible.sync="dialogCommentAddVisible">
      <el-form :model="addComment">
        <el-form-item label="Content" :label-width="formLabelWidth">
          <el-input v-model="addComment.content" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Post" :label-width="formLabelWidth">
          <el-select
            v-model="addComment.postId"
            placeholder="Please select a Post"
            style="float: left"
          >
            <el-option
              v-for="item in tableData"
              :key="item.postId"
              :label="item.postContent"
              :value="item.postId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCommentAddVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirmAddComment()"
          >Confirm</el-button
        >
      </span>
    </el-dialog>
    <el-table
      :data="searchResult ? searchResult : tableData"
      style="width: 100%"
    >
      <el-table-column label="Id" width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.postId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Event" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.eventName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Content" :min-width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.postContent }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Image" prop="avatarUrl">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleImage(scope.row.imageUrl)">Show</el-button>
          <el-dialog title="User Image"  :visible.sync="imageDialogVisible">
        
            <el-form :model="dialogImage">
               <el-form-item >
                <el-image style="width: 100%; " :fit="fit" v-if="dialogImage.imageUrl===''">
                  <div slot="error" class="image-slot text-center" >
                    <i style="font-size:3rem" class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                
                  <img style="width: 100%;" :src="dialogImage.imageUrl" />
               </el-form-item>
            </el-form>
          </el-dialog>
        </template>
      </el-table-column>
      <el-table-column label="Created At">
        <template slot-scope="scope">
          <span>{{ scope.row.createDate }}</span>
        </template>
      </el-table-column>
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
          <el-dialog title="Post Detail" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              
<el-row type="flex" class="row-bg" justify="center">
                <el-form-item style="width:50%">
                <el-image style="width: 100%; " :fit="fit" v-if="form.imageUrl===''">
                  <div slot="error" class="image-slot text-center" >
                    <i style="font-size:3rem" class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                
                  <img style="width: 100%;" :src="form.imageUrl" />
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
                  <input id="postimageupload" ref="postimageupload" accept="image/png,image/jpeg,image/jpg" style="display: none;" type="file" v-on:change="handleFileChange"/>
                </label>
              <el-form-item label="Post Content" :label-width="formLabelWidth">
                <el-input
                  v-model="form.postContent"
                  autocomplete="off"
                ></el-input>
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
          >{{ item.pageId }}</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import * as firebase from "firebase/app";
import "firebase/firebase-storage";
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
      imageDialogVisible:false,
      dialogImage:{imageUrl:""},
      form: {
        postContent: "",
        imageUrl:""
      },
      addPost: {
        postContent: "",
        eventId: "",
        imageUrl:"",
        imageFile:"",
      },
      addComment: {
        content: "",
        postId: ""
      },
      uploadingImage:"",
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
    const req = Request();

    let EventRepository = this.$repository.get("events");
    let PostRepository = this.$repository.get("posts");

    let pageSize = 5;

    new PostRepository(req).get({pageSize}).then(rs => {

        this.tableData = rs.data.data;
        this.totalPages = rs.data.totalPages;
        this.pagination=[];
        for (let i = 0; i < this.totalPages; i++) {
          this.pagination.push({ pageId: i + 1, pageName: "page" });
        }

      }).catch(e => console.error(e));

      new EventRepository(req).get()
      .then(rs => (this.listEvent = rs.data.data))
      .catch(e => console.error(e));

  },
  methods: {
    handleImage(imageUrl){
        this.imageDialogVisible=true;
        this.dialogImage.imageUrl=imageUrl;
        console.log(imageUrl,this.dialogImage)
    },
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

      this.form.eventId = row.eventId;
      this.form.postContent = row.postContent;

      this.form.imageUrl = row.imageUrl;
    },
    async confirm(index, row) {
      this.dialogFormVisible = false;

      let postId = this.tableData[this.editedIndex].postId;
      try{


        if(this.form.imageFile){
            var ref = firebase.storage().refFromURL("gs://fiep-e6602.appspot.com").child(`posts/${this.form.imageFile.name}`);

            await ref.put(this.form.imageFile)
            let imageUrl=await ref.getDownloadURL();
           await  axios.patch(backendIp+`/api/posts/` + postId, {
            postContent: this.form.postContent,
            imageUrl
          });

          this.tableData[this.editedIndex].postContent=this.form.postContent;

          this.tableData[this.editedIndex].imageUrl=imageUrl;
        }else{
          await  axios.patch(backendIp+`/api/posts/` + postId, {
            postContent: this.form.postContent
          });

          this.tableData[this.editedIndex].postContent=this.form.postContent;
        }

        this.$message(
        {
          message:`Update post ${postId} successfully`,
          type:"success"
        }
        );
      }catch(e){
        console.log(e);
        this.$message(
        {
          message:`Fail to update post ${postId} `,
        }
        );
      }



      this.tableData[this.editedIndex].postContent = this.form.postContent;
    },readAsync(blob) {
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
    async confirmAdd() {
      this.dialogFormAddVisible = false;

      let eventId = this.addPost.eventId;
      let postContent = this.addPost.postContent;

      try{
      if(this.addPost.imageFile){
        var ref = firebase.storage().refFromURL("gs://fiep-e6602.appspot.com").child(`posts/${this.addPost.imageFile.name}`);

          await ref.put(this.addPost.imageFile)
          let imageUrl=await ref.getDownloadURL();

         await axios.post(backendIp+`/api/posts`, {
         eventId,postContent,imageUrl
        });

      }else{
          await axios.post(backendIp+`/api/posts`, {
          eventId,postContent,imageUrl:""
        });
      }
       this.$message({
         type:"success",
            message: `Create new post successfully!`
          });
const req = Request();
    let PostRepository = this.$repository.get("posts");
    let pageSize = 5;
    new PostRepository(req)
      .get({pageSize})
      .then(rs => {
        this.tableData = rs.data.data;
        this.totalPages = rs.data.totalPages;
        this.pagination=[];
        for (let i = 0; i < this.totalPages; i++) {
          this.pagination.push({ pageId: i + 1, pageName: "page" });
        }
      })
      .catch(e => console.error(e));


      }catch(e){
        console.log(e)
        this.$message({
            message: `Fail to create new post`
          });
      }
    }, async handleFileChange(){
        let file = this.$refs.postimageupload.files[0];
        let resultData=await this.readAsync(file);
        this.form.imageUrl=resultData;
        this.form.imageFile=file;
      },
      async handleFileChangeOnCreatePost(){
        let file = this.$refs.createpostimageupload.files[0];
        let resultData=await this.readAsync(file);
        this.addPost.imageUrl=resultData;
        this.addPost.imageFile=file;
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
