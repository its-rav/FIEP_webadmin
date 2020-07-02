import { parseParams } from "../../utilities";

const resource = "/posts";
const otherResources = {
  events: "/events"
};
const SORT_BY = {
  createdate: 0
};
class PostRepository {
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

  getPostsOfEvent = (
    eventId,
    {
      pageNumber = 1,
      pageSize = 10,
      isDesc = true,
      sortBy = "createdate",
      fieldSize = "long"
    }={}
  ) => {
    let params = parseParams({
      query,
      pageNumber,
      pageSize,
      isDesc,
      sortBy: SORT_BY[sortBy.toLowerCase()],
      fieldSize
    });

    return this.req.get(`${otherResources["events"]}/${eventId}/posts`, {
      params
    });
  };

  create = ({ eventId, postContent, imageUrl }) =>
    this.req.post(`${resource}`, {
      data: {
        eventId,
        postContent,
        imageUrl
      }
    });

  update = (id, { eventId, postContent, imageUrl }) =>
    this.req.put(`${resource}/${id}`, {
      data: {
        eventId,
        postContent,
        imageUrl
      }
    });

  delete = id => this.req.delete(`${resource}/${id}`);
}
export default PostRepository;
