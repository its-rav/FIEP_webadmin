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
      :data="tableData.filter(data => !search || data.GroupId.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column label="GroupID" width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.groupID}}</span>
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
  </div>
</template>

<script>
import Request from "../services/RequestBase.js";
import axios from "axios";
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
      editedIndex: -1
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
    let pageSize = 10;
    new GroupRepository(req)
      .get({ pageSize })
      .then(rs => (this.tableData = rs.data.data))
      .catch(e => console.error(e));
    // axios.get(`https://192.168.1.24:8083/api/events`)
    // .then(response => {
    //   this.tableData = response.data.data
    // })
    // .catch(e => {
    //   this.errors.push(e)
    // })
    // new PostRepository(req).get().then(rs =>(this.tableData = rs.data)).catch(e => console.error(e));
  },
  methods: {
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
      let groupID = this.tableData[this.editedIndex].groupID;
      axios
        .patch(`https://192.168.1.24:8083/api/groups/` + groupID, {
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
        .post(`https://192.168.1.24:8083/api/groups`, {
          imageUrl: imageUrl1,
          groupName: groupName1,
          managerId: managerId1
        })
        .then(response => {});
      this.addGroup.groupName = "";
      let GroupDetail = {
        groupID: this.tableData.length +1,
        groupName: groupName1,
        groupFollower: 0
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
      this.groupIdDelete = row.groupID;
      axios
        .delete(`https://192.168.1.24:8083/api/groups/` + this.groupIdDelete)
        .then(response => {});
      this.tableData.splice(index, 1);
    }
  }
};
</script>