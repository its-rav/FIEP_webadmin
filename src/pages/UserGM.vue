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
      <el-form :model="addUser" :rules="rulesForm" ref="addUser">
        <el-form-item label="Fullname" :label-width="formLabelWidth">
          <el-input v-model="addUser.fullName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Email" :label-width="formLabelWidth">
          <el-input v-model="addUser.email" autocomplete="off"></el-input>
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
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input  v-model="search" v-on:change="onSearchInput($event)" size="mini" placeholder="Type to search" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-dialog title="User Detail" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="Fullname" :label-width="formLabelWidth">
                <el-input v-model="form.fullName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="Email" :label-width="formLabelWidth">
                <el-input v-model="form.email" autocomplete="off"></el-input>
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
import baseConfig from "../config";
const backendIp=baseConfig.backendIp;
export default {
  data() {
    return {
      tableData: [],
      addUser: {
        userId: "",
        fullName: "",
        email: "",
        role: ""
      },
      dialogFormVisible: false,
      dialogFormAddVisible: false,
      form: {
        fullName: "",
        userId: "",
        role: ""
      },
      formLabelWidth: "120px",
      search: "",
      editedIndex: -1,
      userIdDelete: "",
      pagination: [],
      totalPages: 0,
      searchResult: null,
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
    let pageSize = 5;
    new UserRepository(req)
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
  methods: {
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
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.editedIndex = this.tableData.indexOf(row);
      this.form.fullName = row.fullName;
      this.form.email = row.mail;
    },
    confirm(index, row) {
      var currentDate = new Date();
      var currentDateWithFormat = new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "-");
      this.dialogFormVisible = false;
      let userId = this.tableData[this.editedIndex].userId;
      axios
        .patch(backendIp+`/api/users/` + userId, {
          roleId: 2,
          email: this.form.email,
          fullName: this.form.fullName
        })
        .then(response => {});
      this.tableData[this.editedIndex].mail = this.form.email;
      this.tableData[this.editedIndex].fullName = this.form.fullName;
    },
    makeid(length) {
      var text = "";
      var possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    },
    confirmAdd(formName) {
      this.dialogFormAddVisible = false;
      axios
        .post(backendIp+`/api/users`, {
          fullName: this.addUser.fullName,
          email: this.addUser.email,
          roleId: 2
        })
        .then(response => {});
      let userDetail = {
        fullName: this.addUser.fullName,
        mail: this.addUser.email,
        userId: this.makeid(32)
      };
      this.tableData.push(userDetail);
      this.addUser.fullName = "";
      this.addUser.email = "";
      // });
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