<template>
  <div>
    <h1>USER MANAGEMENT</h1>
    <el-button
      type="primary"
      @click="dialogFormAddVisible = true"
      style="margin-bottom: 15px"
      plain
    >Add new User</el-button>

    <el-dialog title="Add new User" :visible.sync="dialogFormAddVisible">
      <el-form :model="addUser" ref="addUser">
        <el-row type="flex" class="row-bg" justify="center">
                <el-form-item style="width:50%">
                <el-image style="width: 100%; " :fit="fit" v-if="addUser.avatarUrl===''">
                  <div slot="error" class="image-slot text-center" >
                    <i style="font-size:3rem" class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                
                  <img style="width: 100%;" :src="addUser.avatarUrl" />
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
                  <input id="createuserimageupload" ref="createuserimageupload" accept="image/png,image/jpeg,image/jpg" style="display: none;" type="file" v-on:change="handleFileChangeOnCreateUser"/>
                </label>


        <el-form-item label="Fullname" :label-width="formLabelWidth">
          <el-input v-model="addUser.fullName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Email" :label-width="formLabelWidth">
          <el-input v-model="addUser.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Role" :label-width="formLabelWidth">
          <el-select v-model="addUser.role" placeholder="Please select a role" style="float: left">
            <el-option label="Admin" value="1"></el-option>
            <el-option label="User" value="2"></el-option>
            <el-option label="Group Manager" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormAddVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirmAdd('addUser')">Confirm</el-button>
      </span>
    </el-dialog>

    <el-table
      :data="searchResult?searchResult:tableData"
      style="width: 100%"
    >
      <el-table-column label="UserId" :min-width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.userId}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Fullname">
        <template slot-scope="scope">
          <span>{{ scope.row.fullName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Email">
        <template slot-scope="scope">
          <span>{{ scope.row.mail}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Image" prop="avatarUrl">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleImage(scope.row.avatarUrl)">Show</el-button>
          <el-dialog title="User Image"  :visible.sync="imageDialogVisible">
        
            <el-form :model="dialogImage">
               <el-form-item >
                <el-image style="width: 100%; " :fit="fit" v-if="dialogImage.imageUrl===''">
                  <div slot="error" class="image-slot text-center" >
                    <i style="font-size:3rem" class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                
                  <img style="width: 100%;" :src="dialogImage.imageUrl" />
                  <span slot="title">adasdasd</span>
               </el-form-item>
            </el-form>
          </el-dialog>
        </template>
      </el-table-column>
      
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input  v-model="search" v-on:input="onSearchInput($event)" v-on:change="onSearchChange($event)" size="mini" placeholder="Type to search" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-dialog title="User Detail"  :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-row type="flex" class="row-bg" justify="center">
                <el-form-item style="width:50%">
                <el-image style="width: 100%; " :fit="fit" v-if="form.avatarUrl===''">
                  <div slot="error" class="image-slot text-center" >
                    <i style="font-size:3rem" class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                
                  <img style="width: 100%;" :src="form.avatarUrl" />
                </el-form-item>
                
              </el-row>
              <label class="file-select">
                  <!-- We can't use a normal button element here, as it would become the target of the label. -->
                    <div class="select-button">
                    <!-- Display the filename if a file has been selected. -->
                      <span v-if="uploadingImage" style="padding: 1rem;color: white;background-color: #2EA169;border-radius: .3rem;text-align: center;font-weight: bold;">Selected image: {{uploadingImage.name}}</span>
                      <span v-else style="cursor:pointer;">Select File</span>
                    </div>
                  <!-- Now, the file input that we hide. -->
                  <input id="userimageupload" ref="userimageupload" accept="image/png,image/jpeg,image/jpg" style="display: none;" type="file" v-on:change="handleFileChange"/>
                </label>
              <el-form-item label="Fullname" :label-width="formLabelWidth">
                <el-input v-model="form.fullName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="Email" :label-width="formLabelWidth">
                <el-input v-model="form.email" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="Role" :label-width="formLabelWidth">
                <el-select
                  v-model="form.roleId"
                  placeholder="Please select a role"
                  style="float: left"
                >
                  
                  <el-option v-for="role in roleTable" :key="role.roleId" :label="role.roleName" :value="role.roleId" ></el-option>
                </el-select>
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
    <el-row style="margin-top: 10px" v-if="searchResult == null">

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
import * as firebase from "firebase/app";
import "firebase/firebase-storage";
import baseConfig from "../config";
const backendIp=baseConfig.backendIp;
export default {
  data() {
    return {
       searchResult: null,

      uploadingImage:null,
      roleTable:[
        {
          roleId:1,
          roleName:"Admin"
        },
        {
          roleId:2,
          roleName:"User"
        },
        {
          roleId:3,
          roleName:"Group Manager"
        },
      ],
      tableData: [],
      addUser: {
        userId: "",
        fullName: "",
        email: "",
        role: "",
        avatarUrl:"",
        
        avatarFile:null,
      },
      dialogImage:{imageUrl:""},
      dialogFormVisible: false,
      imageDialogVisible:false,
      dialogFormAddVisible: false,
      form: {
        fullName: "",
        userId: "",
        roleId: "",
        avatarUrl:"",
        avatarFile:null,

      },
      formLabelWidth: "120px",
      search: "",
      editedIndex: -1,
      userIdDelete: "",
      pagination: [],
      totalPages: 0
    };
  },
  created: function() {
    const req = Request();
    let UserRepository = this.$repository.get("users");
    let pageSize = 5;
    new UserRepository(req)
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
  },
  methods: {
      async handleFileChange(){
        let file = this.$refs.userimageupload.files[0];
        let resultData=await this.readAsync(file);
        this.form.avatarUrl=resultData;
        this.form.avatarFile=file;
      },
      async handleFileChangeOnCreateUser(){
        let file = this.$refs.createuserimageupload.files[0];
        let resultData=await this.readAsync(file);
        this.addUser.avatarUrl=resultData;
        this.addUser.avatarFile=file;
      },
    paginationLoad(pageNumber) {
      const req = Request();
      let pageSize = 5;
      let UserRepository = this.$repository.get("users");
      new UserRepository(req)
        .get({ pageSize, pageNumber })
        .then(rs => {
          this.tableData = rs.data.data;
          console.log(this.tableData);
        })
        .catch(e => console.error(e));
    },
    handleImage(imageUrl){
        this.imageDialogVisible=true;
        this.dialogImage.imageUrl=imageUrl;
        console.log(imageUrl,this.dialogImage)
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.editedIndex = this.tableData.indexOf(row);
      this.form.fullName = row.fullName;
      this.form.avatarUrl=row.avatarUrl;
      this.form.roleId = row.roleId;
      this.form.email = row.mail;
    },
    async confirm(index, row) {
      this.dialogFormVisible = false;

      let userId = this.tableData[this.editedIndex].userId;
      if(this.form.avatarFile){
        try{
          var ref = firebase.storage().refFromURL("gs://fiep-e6602.appspot.com").child(`users/${this.form.avatarFile.name}`);
          
          await ref.put(this.form.avatarFile)
          let imageUrl=await ref.getDownloadURL();
          await axios.patch(backendIp+`/api/users/` + userId, {
                  roleId: this.form.role,
                  email: this.form.email,
                  fullName: this.form.fullName,
                  avatarUrl:imageUrl
                });
                this.$message({
                  type:"success",
            message: `Edit user ${userId} successfully`
          });
          
      }catch(e){
        console.log(e);
        this.$message({
            message: `Fail to edit user ${userId}`
          });
      }

      }else{
        try{
          await axios.patch(backendIp+`/api/users/` + userId, {
                  roleId: this.form.role,
                  email: this.form.email,
                  fullName: this.form.fullName,
                });
                this.$message({
                  type:"success",
            message: `Edit user ${userId} successfully`
          });
      }catch(e){
        console.log(e);
        this.$message({
            message: `Fail to edit user ${userId}`
          });
      }
      }




      
      


      this.tableData[this.editedIndex].mail = this.form.email;
      this.tableData[this.editedIndex].fullName = this.form.fullName;
      this.tableData[this.editedIndex].avatarUrl = this.form.avatarUrl;
      this.tableData[this.editedIndex].roleId = this.form.roleId;
    },
    readAsync(blob) {
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
    async confirmAdd(formName) {
      // this.$refs[formName].validate(valid => {
      this.dialogFormAddVisible = false;
      try{
      if(this.addUser.avatarFile){
        var ref = firebase.storage().refFromURL("gs://fiep-e6602.appspot.com").child(`users/${this.addUser.avatarFile.name}`);
          
          await ref.put(this.addUser.avatarFile)
          let imageUrl=await ref.getDownloadURL();

         await axios.post(backendIp+`/api/users`, {
          fullName: this.addUser.fullName,
          email: this.addUser.email,
          roleId: this.addUser.role,
          avatarUrl:imageUrl
        });

      }else{
          await axios.post(backendIp+`/api/users`, {
          fullName: this.addUser.fullName,
          email: this.addUser.email,
          roleId: this.addUser.role
        });
      }
       this.$message({
         type:"success",
            message: `Create edit new user successfully!`
          });
const req = Request();
    let UserRepository = this.$repository.get("users");
    let pageSize = 5;
    new UserRepository(req)
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
            message: `Fail to create new user`
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
      this.addUser.image = "";
    },
    handleDelete(index, row) {
      this.userIdDelete = row.userId;
      axios
        .delete(backendIp+`/api/users/` + this.userIdDelete)
        .then(response => {});
      this.tableData.splice(index, 1);
    },
    async onSearchInput(e){
      
    },
    async onSearchChange(e){
        try {
        let result=await axios.get(`${backendIp}/api/users?query=${e}`);

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