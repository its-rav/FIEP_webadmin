<template>
  <div>
    <h1>GROUP MANAGEMENT</h1>
    <el-button
      type="primary"
      @click="dialogFormAddVisible = true"
      style="margin-bottom: 15px"
      plain
    >Add new Group</el-button>

    <el-dialog title="Add New Group" :visible.sync="dialogFormAddVisible">
      <el-form :model="addGroup">
        <el-row type="flex" class="row-bg" justify="center">
                <el-form-item style="width:50%">
                <el-image style="width: 100%; " :fit="fit" v-if="addGroup.groupImageUrl===''">
                  <div slot="error" class="image-slot text-center" >
                    <i style="font-size:3rem" class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                
                  <img style="width: 100%;" :src="addGroup.groupImageUrl" />
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
                  <input id="creategroupimageupload" ref="creategroupimageupload" accept="image/png,image/jpeg,image/jpg" style="display: none;" type="file" v-on:change="handleFileChangeOnCreateGroup"/>
                </label>
        <el-form-item label="Group Name" :label-width="formLabelWidth">
          <el-input v-model="addGroup.groupName" autocomplete="off"></el-input>
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
      :data="searchResult?searchResult:tableData"
      style="width: 100%"
    >
      <el-table-column label="GroupId" width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.groupId}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Group Name" width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.groupName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Follower" width="180px">
        <template slot-scope="scope">
          <span style="align: center">{{ scope.row.groupFollower}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Image" prop="avatarUrl">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleImage(scope.row.groupImageUrl)">Show</el-button>
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
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input  v-model="search" v-on:change="onSearchInput($event)" size="mini" placeholder="Type to search" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-dialog title="Group Detail" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-row type="flex" class="row-bg" justify="center">
                <el-form-item style="width:50%">
                <el-image style="width: 100%; " :fit="fit" v-if="form.groupImageUrl===''">
                  <div slot="error" class="image-slot text-center" >
                    <i style="font-size:3rem" class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                
                  <img style="width: 100%;" :src="form.groupImageUrl" />
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
                  <input id="groupimageupload" ref="groupimageupload" accept="image/png,image/jpeg,image/jpg" style="display: none;" type="file" v-on:change="handleFileChange"/>
                </label>
              <el-form-item label="Group Name" :label-width="formLabelWidth">
                <el-input v-model="form.groupName" autocomplete="off"></el-input>
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
import Request from "../services/RequestBase.js";
import axios from "axios";
import baseConfig from "../config";
const backendIp=baseConfig.backendIp;
export default {
  data() {
    return {
      searchResult: null,
      tableData: [],
      userData:[],
      dialogFormVisible: false,
      dialogFormAddVisible: false,
      form: {
        groupId:"",
        groupName: "",
        groupImageUrl:"",
        groupImageFile:""
      },
      
      dialogImage:{imageUrl:""},
      
      imageDialogVisible:false,
      addGroup: {
        groupId:"",
        groupName: "",
        groupImageUrl:"",
        groupImageFile:""
      },
      uploadingImage:"",
      groupIdDelete: "",
      formLabelWidth: "120px",
      formLabelWidth1: "180px",
      search: "",
      editedIndex: -1,
      pagination: [],
      totalPages: 0
    };
  },
  created: function() {
    const req = Request();
    let GroupRepository = this.$repository.get("groups");

    let pageSize = 5;

    new GroupRepository(req)
      .get({ pageSize })
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
    paginationLoad(pageNumber) {
      const req = Request();
      let pageSize = 5;
      let GroupRepository = this.$repository.get("groups");
      new GroupRepository(req)
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
      this.form.groupId = row.groupId;
      this.form.groupName = row.groupName;
      this.form.groupImageUrl = row.groupImageUrl;
    },
    async confirm(index, row) {
      this.dialogFormVisible = false;

      let groupId = this.form.groupId;
      try{


        if(this.form.groupImageFile){
            var ref = firebase.storage().refFromURL("gs://fiep-e6602.appspot.com").child(`groups/${this.form.groupImageFile.name}`);

            await ref.put(this.form.groupImageFile)
            let imageUrl=await ref.getDownloadURL();
           await  axios.patch(backendIp+`/api/groups/` + groupId, {
            groupName: this.form.groupName,
            groupImageUrl:imageUrl
          });

          this.tableData[this.editedIndex].groupName=this.form.groupName;

          this.tableData[this.editedIndex].groupImageUrl=imageUrl;
        }else{
          await  axios.patch(backendIp+`/api/groups/` + groupId, {
            
            groupName: this.form.groupName,
          });

          this.tableData[this.editedIndex].groupName=this.form.groupName;
        }

        this.$message(
        {
          message:`Update group ${groupId} successfully`,
          type:"success"
        }
        );
      }catch(e){
        console.log(e);
        this.$message(
        {
          message:`Fail to update group ${groupId} `,
        }
        );
      }

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

     let groupId = this.addGroup.groupId;
      let groupName = this.addGroup.groupName;

      let managerId="";//todo
      try{
      if(this.addGroup.groupImageFile){
        var ref = firebase.storage().refFromURL("gs://fiep-e6602.appspot.com").child(`groups/${this.addGroup.groupImageFile.name}`);

          await ref.put(this.addGroup.groupImageFile)
          let imageUrl=await ref.getDownloadURL();

         await axios.post(backendIp+`/api/groups`, {
         groupName,managerId,groupImageUrl:imageUrl
        });

      }else{
          await axios.post(backendIp+`/api/posts`, {
           groupName,managerId,groupImageUrl:""
        });
      }
       this.$message({
         type:"success",
            message: `Create new group successfully!`
          });
const req = Request();
    let GroupRepository = this.$repository.get("groups");
    let pageSize = 5;
    new GroupRepository(req)
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
            message: `Fail to create new group`
          });
      }
     
    },
    handleImage(imageUrl){
        this.imageDialogVisible=true;
        this.dialogImage.imageUrl=imageUrl;
        console.log(imageUrl,this.dialogImage)
    },
    async handleFileChange(){
        let file = this.$refs.groupimageupload.files[0];
        let resultData=await this.readAsync(file);
        this.form.groupImageUrl=resultData;
        this.form.groupImageFile=file;
      },
      async handleFileChangeOnCreateGroup(){
        let file = this.$refs.creategroupimageupload.files[0];
        let resultData=await this.readAsync(file);
        this.addGroup.groupImageUrl=resultData;
        this.addPost.groupImageFile=file;
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
      this.addGroup.image = "";
    },
    handleDelete(index, row) {
      this.groupIdDelete = row.groupId;
      axios
        .delete(backendIp+`/api/groups/` + this.groupIdDelete)
        .then(response => {});
      this.tableData.splice(index, 1);
    },
    async onSearchInput(e){
      try {
        let result=await axios.get(`${backendIp}/api/groups?query=${e}`);

      console.log(result);
        this.searchResult= result.data.data;
      } catch (error) {
        this.searchResult = null;
        console.log(error);
      }
    }
  },
};
</script>