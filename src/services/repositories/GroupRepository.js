import { parseParams } from "../../utilities";

const resource = "/groups";
const otherResources = {
  groupSubscription: "/groupsubscriptions"
};
const SORT_BY = {
  follower: 0
};
class GroupRepository {
  constructor(requestInstance) {
    this.req = requestInstance;
  }

  get = ({
    query = "",
    pageNumber = 1,
    pageSize = 10,
    isDesc = true,
    sortBy = "follower",
    fieldSize = "long"
  } = {}) => {
    let params = parseParams({
      query,
      pageNumber,
      pageSize,
      isDesc,
      sortBy: SORT_BY[sortBy.toLowerCase()],
      fieldSize
    });

    return this.req.get(`${resource}`, { params });
  };

  getById = id => this.req.get(`${resource}/${id}`);
  
  create = ({ groupName, imageUrl, managerId }) =>
    this.req.post(`${resource}`, {
      data: {
        groupName,
        imageUrl,
        managerId
      }
    });

  update = (id, { groupName, imageUrl, managerId }) =>
    this.req.put(`${resource}/${id}`, {
      data: {
        groupName,
        imageUrl,
        managerId
      }
    });

  addSubscription = (groupId, userId) =>
    this.req.post(`${otherResources["groupSubscription"]}`, {
      data: {
        groupId,
        userId
      }
    });

  deleteSubscription = (groupId, userId) =>
    this.req.delete(
      `${otherResources["groupSubscription"]}/${groupId}/${userId}`
    );

  removeAdmin = (groupId, userId) => {
    throw "Not Implemented";
  };

  addAdmin = (groupId, userId) =>
    this.req.put(
      `${otherResources["groupSubscription"]}/${groupId}/${userId}`,
      {
        data: {
          subscriptionType: 2
        }
      }
    );

  delete = id => this.req.delete(`${resource}/${id}`);
}
export default GroupRepository;
