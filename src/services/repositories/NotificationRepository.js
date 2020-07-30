import { parseParams } from "../../utilities";

const resource = "/notifications";
const otherResources = {
  events: "/events",
  groups: "/groups"
};
const SORT_BY = {
  createdate: 0
};
class NotificationRepository {
  constructor(requestInstance) {
    this.req = requestInstance;
  }

  get = ({
    query = "",
    pageNumber = 1,
    pageSize = 10,
    isDesc = true,
    sortBy = "createdate",
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

  createGroupNotification = (groupId, { title, body, imageUrl }) =>
    this.req.put(`${otherResources["groups"]}/${groupId}/notification`, {
      title,
      body,
      imageUrl
    });
  createEventNotification = (eventId, { title, body, imageUrl }) =>
    this.req.put(`${otherResources["events"]}/${eventId}/notification`, {
      data: {
        title,
        body,
        imageUrl
      }
    });

  delete = id => this.req.delete(`${resource}/${id}`);
}
export default NotificationRepository;
