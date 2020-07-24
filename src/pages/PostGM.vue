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
            <el-option label="ACM" value="ACM"></el-option>
            <el-option label="Tiktok" value="Tiktok"></el-option>
            <el-option label="Club celebration" value="Club celebration"></el-option>
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
    <el-table
      :data="tableData.filter(data => !search || data.eventName.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column label="Event Name" prop="eventName" width="180px"></el-table-column>
      <el-table-column label="Post Content" prop="postContent"></el-table-column>
      <el-table-column label="Create Date" prop="createDate"></el-table-column>
      <el-table-column label="Modify Date" prop="modifyDate"></el-table-column>
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
              <el-form-item label="Event Name" :label-width="formLabelWidth">
                <el-select
                  v-model="form.eventName"
                  placeholder="Please select a Event"
                  style="float: left"
                >
                  <el-option label="ACM" value="ACM"></el-option>
                  <el-option label="Tiktok" value="Tiktok"></el-option>
                  <el-option label="Club celebration" value="Club celebration"></el-option>
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
          eventName: "ACM",
          postContent: "F-Code celebrate abc xyz tbm",
          modifyDate: "2020-06-29",
          createDate: "2020-06-29"
        },
        {
          eventName: "ACM",
          postContent: "F-Code celebrate abc xyz tbm",
          modifyDate: "2020-06-29",
          createDate: "2020-06-29"
        },
        {
          eventName: "ACM",
          postContent: "F-Code celebrate abc xyz tbm",
          modifyDate: "2020-06-29",
          createDate: "2020-06-29"
        },
        {
          eventName: "ACM",
          postContent: "F-Code celebrate abc xyz tbm",
          modifyDate: "2020-06-29",
          createDate: "2020-06-29"
        },
        {
          eventName: "ACM",
          postContent: "F-Code celebrate abc xyz tbm",
          modifyDate: "2020-06-29",
          createDate: "2020-06-29"
        }
      ],
      dialogFormVisible: false,
      dialogFormAddVisible: false,
      form: {
        eventName: "",
        postContent: ""
      },
      addPost: {
        postContent: "",
        eventName: ""
      },
      formLabelWidth: "120px",
      formLabelWidth1: "180px",
      search: "",
      editedIndex: -1
    };
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
      this.tableData[this.editedIndex].eventName = this.form.eventName;
      this.tableData[this.editedIndex].postContent = this.form.postContent;
      this.tableData[this.editedIndex].modifyDate = currentDateWithFormat;
    },
    confirmAdd() {
      this.dialogFormAddVisible = false;
      var currentDate = new Date();
      var currentDateWithFormat = new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "-");
      let PostDetail = {
        eventName: this.addPost.eventName,
        postContent: this.addPost.postContent,
        createDate: currentDateWithFormat
      };
      this.tableData.push(PostDetail);
      this.addPost.eventName = "";
      this.addPost.postContent = "";
      this.addPost.image = "";
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