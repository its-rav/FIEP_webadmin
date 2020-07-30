import { parseParams } from "../../utilities";

const resource = "/events";
const otherResources = {
  eventSubscriptions: "/eventsubscriptions",
  groups: "/groups"
};
const SORT_BY = {
  timeoccur: 0,
  follower: 1
};

class EventRepository {
  constructor(requestInstance) {
    this.req = requestInstance;
  }

  get = ({
    isUpComing,
    query = "",
    pageNumber = 1,
    pageSize = 10,
    isDesc = true,
    approveState = 2,
    sortBy = "timeoccur",
    fieldSize = "long"
  } = {}) => {
    let params = parseParams({
      isUpComing,
      query,
      pageNumber,
      pageSize,
      isDesc,
      approveState,
      sortBy: SORT_BY[sortBy.toLowerCase()],
      fieldSize
    });

    return this.req.get(`${resource}`, { params });
  };

  getEventsOfGroup = (groupId,{
    isUpComing,
    query = "",
    pageNumber = 1,
    pageSize = 10,
    isDesc = true,
    approveState = 2,
    sortBy = "timeoccur",
    fieldSize = "long"
  } = {}) => {
    let params = parseParams({
      isUpComing,
      query,
      pageNumber,
      pageSize,
      isDesc,
      approveState,
      sortBy: SORT_BY[sortBy.toLowerCase()],
      fieldSize
    });

    return this.req.get(`${otherResources["groups"]}/${groupId}/events`, { params });
  };

  getById = id => this.req.get(`${resource}/${id}`);

  create = ({ groupId, eventName, timeOccur, eventImageUrl, location }) =>
    this.req.post(`${resource}`, 
      {
        groupId,
        eventName,
        timeOccur,
        eventImageUrl,
        location
      }
    );

  addSubscription = ( eventID, userId ) =>
    this.req.post(`${otherResources["eventSubscriptions"]}`,{
        eventID,
        userId
      }
    );

  deleteSubscription = (eventID, userId) =>
    this.req.delete(
      `${otherResources["eventSubscriptions"]}/${eventID}/${userId}`
    );

  update = (id, {eventName,timeOccur,eventImageUrl,location,isExpired,approveState,groupId}) => this.req.put(`${resource}/${id}`, 
    {
      eventName,timeOccur,eventImageUrl,location,isExpired,approveState,groupId
    }
  );

  delete = id => this.req.delete(`${resource}/${id}`);
}

export default EventRepository;
