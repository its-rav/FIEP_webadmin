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
        <!-- <el-form-item label="Group" :label-width="formLabelWidth">
          <input   v-model="addEvent.groupName" list="searchGroupTableDataList" placeholder="Type to search" />
          <datalist id="searchGroupTableDataList" >
              <option v-for="item in groupList" :key="item.groupId" :label="item.groupName" :value="item.groupId"/>
          </datalist>
        </el-form-item>-->

        <el-form-item label="Group" :label-width="formLabelWidth">
          <el-select
            v-model="addEvent.groupName"
            placeholder="Please select a Group"
            style="float: left"
          >
            <el-option
              v-for="item in groupList"
              :key="item.groupId"
              :label="item.groupName"
              :value="item.groupId"
            ></el-option>
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
          <el-date-picker
            v-model="addEvent.timeOccur"
            type="datetime"
            placeholder="Select date and time"
          ></el-date-picker>
          <!-- <el-input v-model="addEvent.timeOccur" autocomplete="off"></el-input> -->
        </el-form-item>
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
      <el-table-column label="EventId" :min-width="50">
        <template slot-scope="scope">
          <span>{{ scope.row.eventId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Event Name" :min-width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.eventName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Group Name" :min-width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.groupName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Location" width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.location }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Approval State">
        <template slot-scope="scope">
          <span>{{ scope.row.approveState === 1 ? "Aprrove" : "Pending" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Time Occur" prop="timeOccur">
        <template slot-scope="scope">
          <span>{{ scope.row.timeOccur}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Create Date" prop="createDate">
        <template slot-scope="scope">
          <span>{{ scope.row.createDate}}</span>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input  v-model="search" v-on:change="onSearchInput($event)" size="mini" placeholder="Type to search" />
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
                  <el-option
                    v-for="item in groupList"
                    :key="item.groupId"
                    :label="item.groupName"
                    :value="item.groupId"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Location" :label-width="formLabelWidth">
                <el-input v-model="form.location" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="Time Occur" :label-width="formLabelWidth">
                <el-date-picker
                  v-model="form.timeOccur"
                  type="datetime"
                  placeholder="Select date and time"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="Approval State" :label-width="formLabelWidth">
                <el-select
                  v-model="form.state"
                  placeholder="Please select a State"
                  style="float: left"
                >
                  <el-option label="Approve" value="1"></el-option>
                  <el-option label="Pending" value="0"></el-option>
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
import axios from "axios";
import Request from "../services/RequestBase.js";
import baseConfig from "../config";
const backendIp = baseConfig.backendIp;
export default {
  data() {
    return {
      tableData: [],
      searchResult: null,
      groupList: [],
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
      eventIdDelete: "",
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
    let GroupRepository = this.$repository.get("groups");
    let pageSize = 5;

    new EventRepository(req)
      .get({ pageSize })
      .then(rs => {
        this.tableData = rs.data.data;
        this.totalPages = rs.data.totalPages;
        for (let i = 0; i < this.totalPages; i++) {
          this.pagination.push({ pageId: i + 1, pageName: "page" });
        }
      })
      .catch(e => console.error(e));
    new GroupRepository(req)
      .get()
      .then(rs => {
        this.groupList = rs.data.data;
      })
      .catch(e => console.error(e));
  },
  methods: {
    paginationLoad(pageNumber) {
      const req = Request();
      let pageSize = 5;
      let EventRepository = this.$repository.get("events");
      new EventRepository(req)
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
      this.form.eventName = row.eventName;
      this.form.groupName = row.groupName;
      this.form.location = row.location;
      this.form.timeOccur = row.timeOccur;
      let approve = "";
      if (row.approveState === 1) {
        this.approve = "Approve";
      } else {
        this.approve = "Pending";
      }
      this.form.state = this.approve;
      console.log(this.editedIndex);
    },
    confirm(index, row) {
      var currentDate = new Date();
      var currentDateWithFormat = new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "-");
      this.dialogFormVisible = false;
      let eventEdit = this.tableData[this.editedIndex].eventId;
      let stateEdit = "";
      let groupNameEdit = "";
      if (this.form.state === "1") {
        this.stateEdit = 1;
      } else if (this.form.state === "0") {
        this.stateEdit = 0;
      }
      if(this.form.groupName === 1){
        this.groupNameEdit = "F-Code"
      }else if(this.form.groupName === 2){
        this.groupNameEdit = "FPT Event Club"
      }else if(this.form.groupName === 3){
        this.groupNameEdit = "FPT Instrument Club"
      }else if(this.form.groupName === 4){
        this.groupNameEdit = "FPT Chess Club"
      }else if(this.form.groupName === 5){
        this.groupNameEdit = "FPT Guitar Club"
      }else if(this.form.groupName === 6){
        this.groupNameEdit = "Fpt Vovinam Club"
      }else if(this.form.groupName === 7){
        this.groupNameEdit = "Fpt Game Club"
      }else if(this.form.groupName === 8){
        this.groupNameEdit = "Fpt Board Game Club"
      }else if(this.form.groupName === 9){
        this.groupNameEdit = "Fpt Badminton Club"
      }else if(this.form.groupName === 10){
        this.groupNameEdit = "Fpt Football Club"
      }
      axios
        .patch(backendIp + `/api/events/` + eventEdit, {
          eventName: this.form.eventName,
          timeOccur: this.form.timeOccur,
          groupId: this.form.groupName,
          approvalState: this.stateEdit,
          location: this.form.location
        })
        .then(response => {});
      this.tableData[this.editedIndex].eventName = this.form.eventName;
      this.tableData[this.editedIndex].groupName = this.groupNameEdit;
      this.tableData[this.editedIndex].location = this.form.location;
      this.tableData[this.editedIndex].timeOccur = this.form.timeOccur;
      this.tableData[this.editedIndex].approveState = this.stateEdit;
    },
    confirmAdd() {
      this.dialogFormAddVisible = false;
      var currentDate = new Date();
      var currentDateWithFormat = new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "-");
      this.dialogFormVisible = false;
      let groupId = this.addEvent.groupName;
      let eventName = this.addEvent.eventName;
      let timeOccur = this.addEvent.timeOccur;
      let eventImageUrl = "";
      let location = this.addEvent.location;
      let eventId = this.tableData.length + 1;
      let approveState = 0;
      let createDate = currentDateWithFormat;
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
      new EventRepository(req)
        .create({ groupId, eventName, timeOccur, eventImageUrl, location })
        .then(rs => (this.tableData = rs.data.data));
      let EventAdd = {
        eventName: this.addEvent.eventName,
        groupID: this.addEvent.groupName,
        location: this.addEvent.location,
        timeOccur: this.addEvent.timeOccur,
        createDate: currentDateWithFormat,
        eventId: this.tableData.length + 1
      };
      this.tableData.push(EventAdd),
      this.addEvent.eventName = "";
      this.addEvent.timeOccur = "";
      this.addEvent.groupName = "";
      this.addEvent.location = "";
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
      this.eventIdDelete = row.eventId;
      axios
        .delete(backendIp + `/api/events/` + this.eventIdDelete)
        .then(response => {});
      this.tableData.splice(index, 1);
    },
    async onSearchInput(e){
      try {
        let result=await axios.get(`${backendIp}/api/events?query=${e}`);

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