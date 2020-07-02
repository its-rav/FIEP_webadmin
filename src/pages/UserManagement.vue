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
          <el-input v-model="addUser.userId" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="Avatar" :label-width="formLabelWidth">
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
        <el-button type="primary" @click="confirmAdd('addUser')">Confirm</el-button>
      </span>
    </el-dialog>
    <el-table
      :data="tableData.filter(data => !search || data.fullName.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column label="Email" prop="userId"></el-table-column>
      <el-table-column label="Fullname" prop="fullName"></el-table-column>
      <el-table-column label="Role" prop="role"></el-table-column>
      <el-table-column label="Create Date" prop="createDate"></el-table-column>
      <el-table-column label="Modify Date" prop="modifyDate"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="Type to search" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-dialog title="User Detail" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="Fullname" :label-width="formLabelWidth">
                <el-input v-model="form.fullName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="UserId" :label-width="formLabelWidth">
                <el-input v-model="form.userId" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="Role" :label-width="formLabelWidth">
                <el-select
                  v-model="form.role"
                  placeholder="Please select a role"
                  style="float: left"
                >
                  <el-option label="Student" value="Student"></el-option>
                  <el-option label="President" value="President"></el-option>
                  <el-option label="Admin" value="Admin"></el-option>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          userId: "Tom",
          fullName: "Tom Cruise",
          role: "Student",
          modifyDate: "2020-06-29",
          createDate: "2020-06-29"
        },
        {
          fullName: "John Jerry",
          userId: "John",
          role: "Student",
          modifyDate: "2020-06-29",
          createDate: "2020-06-29"
        },
        {
          fullName: "Morgan Cruise",
          userId: "Morgan",
          role: "President",
          modifyDate: "2020-06-29",
          createDate: "2020-06-29"
        },
        {
          fullName: "Jessy Cruise",
          userId: "Jessy",
          role: "Student",
          modifyDate: "2020-06-29",
          createDate: "2020-06-29"
        },
        {
          userId: "Tom",
          fullName: "Tom Cruise",
          role: "Student",
          modifyDate: "2020-06-29",
          createDate: "2020-06-29"
        },
        {
          userId: "Tom",
          fullName: "Tom Cruise",
          role: "Student",
          modifyDate: "2020-06-29",
          createDate: "2020-06-29"
        },
        {
          userId: "Tom",
          fullName: "Tom Cruise",
          role: "Student",
          modifyDate: "2020-06-29",
          createDate: "2020-06-29"
        }
      ],
      addUser: {
        userId: "",
        fullName: "",
        image: ""
      },
      // rulesForm: {
      //   fullName: [
      //     {
      //       required: true,
      //       message: "Please input Fullname",
      //       trigger: "blur"
      //     },
      //     {
      //       min: 3,
      //       max: 5,
      //       message: "Fullname should be 5 to 35 character",
      //       trigger: "blur"
      //     }
      //   ]
      // },
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
      currentPage2: 5
    };
  },
  methods: {
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.editedIndex = this.tableData.indexOf(row);
      this.form.fullName = row.fullName;
      this.form.role = row.role;
      this.form.userId = row.userId;
      console.log(this.editedIndex);
    },
    confirm(index, row) {
      var currentDate = new Date();
      var currentDateWithFormat = new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "-");
      this.dialogFormVisible = false;
      this.tableData[this.editedIndex].fullName = this.form.fullName;
      this.tableData[this.editedIndex].role = this.form.role;
      this.tableData[this.editedIndex].userId = this.form.userId;
      this.tableData[this.editedIndex].modifyDate = currentDateWithFormat;
    },
    confirmAdd(formName) {
      // this.$refs[formName].validate(valid => {
        this.dialogFormAddVisible = false;
      var currentDate = new Date();
      var currentDateWithFormat = new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "-");
      let userDetail = {
        fullName: this.addUser.fullName,
        userId: this.addUser.userId,
        createDate: currentDateWithFormat
      };
      this.tableData.push(userDetail);
      this.addUser.fullName = "";
      this.addUser.userId = "";
      this.addUser.image = "";
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
      this.$confirm(
        "This will permanently delete the file. Continue?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning"
        }
      )
        .then(() => {
          this.tableData.splice(index, 1);
          this.$message({
            type: "success",
            message: "Delete completed"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled"
          });
        });
    }
  }
};
</script>