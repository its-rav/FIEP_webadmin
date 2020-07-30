<template>
  <div>
    <h1>GROUP MANAGEMENT</h1>
    <el-button
      type="primary"
      @click="dialogFormAddVisible = true"
      style="margin-bottom: 15px"
      plain
    >Add new Group</el-button>

    <el-dialog title="Add new Group" :visible.sync="dialogFormAddVisible">
      <el-form :model="addGroup">
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
      :data="tableData.filter(data => !search || data.groupId.toLowerCase().includes(search.toLowerCase()))"
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
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="Type to search" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-dialog title="Group Detail" :visible.sync="dialogFormVisible">
            <el-form :model="form">
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
    <el-row style="margin-top: 10px">
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
      tableData: [],
      dialogFormVisible: false,
      dialogFormAddVisible: false,
      form: {
        groupName: ""
      },
      addGroup: {
        groupName: ""
      },
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
    new GroupRepository(req)
      .get({ pageSize })
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
      this.form.groupName = row.groupName;
      console.log(this.editedIndex);
    },
    confirm(index, row) {
      var currentDate = new Date();
      var currentDateWithFormat = new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "-");
      this.dialogFormVisible = false;
      let groupId = this.tableData[this.editedIndex].groupId;
      axios
        .patch(backendIp+`/api/groups/` + groupId, {
          groupName: this.form.groupName
        })
        .then(response => {});
      this.tableData[this.editedIndex].groupName = this.form.groupName;
    },
    confirmAdd() {
      this.dialogFormAddVisible = false;
      var currentDate = new Date();
      var currentDateWithFormat = new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "-");
      let groupName1 = this.addGroup.groupName;
      let imageUrl1 ="";
      let managerId1 = "1D8C8527-E1F4-4A77-85EE-68C15F927817";
      axios
        .post(backendIp+`/api/groups`, {
          imageUrl: imageUrl1,
          groupName: groupName1,
          managerId: managerId1
        })
        .then(response => {});
      this.addGroup.groupName = "";
      let GroupDetail = {
        groupId: this.tableData.length +1,
        groupName: groupName1,
        groupFollower: 1
      }
      this.tableData.push(GroupDetail)
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
  },
};
</script>