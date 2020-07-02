<template>
  <div>
    <h1>EVENT MANAGEMENT</h1>
    <el-button
      type="primary"
      @click="dialogFormAddVisible = true"
      style="margin-bottom: 15px"
      plain
    >Add new Event</el-button>

    <el-dialog title="Add new Event" :visible.sync="dialogFormAddVisible">
      <el-form :model="addEvent">
        <el-form-item label="Event Name" :label-width="formLabelWidth">
          <el-input v-model="addEvent.eventName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Group" :label-width="formLabelWidth">
          <el-select
            v-model="addEvent.groupName"
            placeholder="Please select a Group"
            style="float: left"
          >
            <el-option label="F-Code" value="FCode"></el-option>
            <el-option label="FPT Chess Club" value="FCC"></el-option>
            <el-option label="FPT Event Club" value="FEV"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Location" :label-width="formLabelWidth">
          <el-input v-model="addEvent.location" autocomplete="off"></el-input>
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
        <el-form-item label="Time Occur" :label-width="formLabelWidth">
          <el-input v-model="addEvent.timeOccur" autocomplete="off"></el-input>
        </el-form-item>
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
      <el-table-column label="Group" prop="groupName"></el-table-column>
      <el-table-column label="Location" prop="location" width="180px"></el-table-column>
      <el-table-column label="Approval State" prop="state"></el-table-column>
      <el-table-column label="Time Occur" prop="timeOccur"></el-table-column>
      <el-table-column label="Create Date" prop="createDate"></el-table-column>
      <el-table-column label="Modify Date" prop="modifyDate"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="Type to search" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-dialog title="Event Detail" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="Event Name" :label-width="formLabelWidth">
                <el-input v-model="form.eventName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="Group" :label-width="formLabelWidth">
                <el-select
                  v-model="form.groupName"
                  placeholder="Please select a Group"
                  style="float: left"
                >
                  <el-option label="F-Code" value="FCode"></el-option>
                  <el-option label="FPT Chess Club" value="FCC"></el-option>
                  <el-option label="FPT Event Club" value="FEV"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Location" :label-width="formLabelWidth">
                <el-input v-model="form.location" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="Time Occur" :label-width="formLabelWidth">
                <el-input v-model="form.timeOccur" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="Approval State" :label-width="formLabelWidth">
                <el-select
                  v-model="form.state"
                  placeholder="Please select a State"
                  style="float: left"
                >
                  <el-option label="Approve" value="Approve"></el-option>
                  <el-option label="Pending" value="Pending"></el-option>
                  <el-option label="Reject" value="Reject"></el-option>
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
          groupName: "F-Code",
          location: "Hall Of FPT University",
          timeOccur: "2020-06-29",
          modifyDate: "2020-06-29",
          createDate: "2020-06-29",
          state: "Approve",
        },
        {
          eventName: "ACM",
          groupName: "F-Code",
          location: "Hall Of FPT University",
          timeOccur: "2020-06-29",
          modifyDate: "2020-06-29",
          createDate: "2020-06-29",
          state: "Approve",
        },
        {
          eventName: "ACM",
          groupName: "F-Code",
          location: "Hall Of FPT University",
          timeOccur: "2020-06-29",
          modifyDate: "2020-06-29",
          createDate: "2020-06-29",
          state: "Approve",
        },
        {
          eventName: "ACM",
          groupName: "F-Code",
          location: "Hall Of FPT University",
          timeOccur: "2020-06-29",
          modifyDate: "2020-06-29",
          createDate: "2020-06-29",
          state: "Approve",
        },
        {
          eventName: "ACM",
          groupName: "F-Code",
          location: "Hall Of FPT University",
          timeOccur: "2020-06-29",
          modifyDate: "2020-06-29",
          createDate: "2020-06-29",
          state: "Approve",
        }
      ],
      dialogFormVisible: false,
      dialogFormAddVisible: false,
      form: {
        eventName: "",
        groupName: "",
        location: "",
        timeOccur: "",
        state: ""
      },
      addEvent: {
        eventName: "",
        groupName: "",
        location: "",
        timeOccur: ""
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
      this.form.eventName = row.eventName;
      this.form.groupName = row.groupName;
      this.form.location = row.location;
      this.form.timeOccur = row.timeOccur;
      this.form.state = row.state;
      console.log(this.editedIndex);
    },
    confirm(index, row) {
      var currentDate = new Date();
      var currentDateWithFormat = new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "-");
      this.dialogFormVisible = false;
      this.tableData[this.editedIndex].eventName = this.form.eventName;
      this.tableData[this.editedIndex].groupName = this.form.groupName;
      this.tableData[this.editedIndex].location = this.form.location;
      this.tableData[this.editedIndex].timeOccur = this.form.timeOccur;
      this.tableData[this.editedIndex].state = this.form.state;
      this.tableData[this.editedIndex].modifyDate = currentDateWithFormat;
    },
    confirmAdd() {
      this.dialogFormAddVisible = false;
      var currentDate = new Date();
      var currentDateWithFormat = new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "-");
      let EventDetail = {
        eventName: this.addEvent.eventName,
        groupName: this.addEvent.groupName,
        location: this.addEvent.location,
        timeOccur: this.addEvent.timeOccur,
        createDate: currentDateWithFormat
      };
      this.tableData.push(EventDetail);
      this.addEvent.eventName = "";
      this.addEvent.timeOccur = "";
      this.addEvent.groupName = "",
      this.addEvent.location = "",
      this.addEvent.image = "";
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
      this.addEvent.image = "";
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