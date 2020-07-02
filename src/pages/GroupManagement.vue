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
      <el-table-column label="Group Name" prop="groupName" width="180px"></el-table-column>
      <el-table-column label="Create Date" prop="createDate"></el-table-column>
      <el-table-column label="Modify Date" prop="modifyDate"></el-table-column>
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
export default {
  data() {
    return {
      tableData: [
        {
          groupName: "FCC",
          modifyDate: "2020-06-29",
          createDate: "2020-06-29",
        },
        {
          groupName: "F#",
          modifyDate: "2020-06-29",
          createDate: "2020-06-29",
        },
        {
          groupName: "FTI",
          modifyDate: "2020-06-29",
          createDate: "2020-06-29",
        },
        {
          groupName: "FEV",
          modifyDate: "2020-06-29",
          createDate: "2020-06-29",
        },
        {
          groupName: "FVC",
          modifyDate: "2020-06-29",
          createDate: "2020-06-29",
        }
      ],
      dialogFormVisible: false,
      dialogFormAddVisible: false,
      form: {
        groupName: "",
      },
      addGroup: {
        groupName: "",
      },
      formLabelWidth: "120px",
      formLabelWidth1: "180px",
      search: "",
      editedIndex: -1,
    };
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
      this.tableData[this.editedIndex].groupName = this.form.groupName;
      this.tableData[this.editedIndex].modifyDate = currentDateWithFormat;
    },
    confirmAdd() {
      this.dialogFormAddVisible = false;
      var currentDate = new Date();
      var currentDateWithFormat = new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "-");
      let GroupDetail = {
        groupName: this.addGroup.groupName,
        createDate: currentDateWithFormat
      };
      this.tableData.push(GroupDetail);
      this.addGroup.groupName = "",
      this.addGroup.image = "";
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