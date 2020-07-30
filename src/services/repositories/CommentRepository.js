import { parseParams } from "../../utilities";

const resource = "/comments";
const otherResources = {
  posts: "/posts"
};
const SORT_BY = {
  createdate: 0
};
class CommentRepository {
  constructor(requestInstance) {
    this.req = requestInstance;
  }

  get = ({
    pageNumber = 1,
    pageSize = 10,
    isDesc = true,
    sortBy = "createdate",
    fieldSize = "long"
  }={}) => {
    let params = parseParams({
      pageNumber,
      pageSize,
      isDesc,
      sortBy:SORT_BY[sortBy.toLowerCase()],
      fieldSize
    });

    return this.req.get(`${resource}`, { params });
  };

  getById = id => this.req.get(`${resource}/${id}`);

  getCommentsOfPost = (postId,{
    pageNumber = 1,
    pageSize = 10,
    isDesc = true,
    sortBy = "createdate",
    fieldSize = "long"
  }={}) => {
    
    let params = parseParams({
      pageNumber,
      pageSize,
      isDesc,
      sortBy:SORT_BY[sortBy.toLowerCase()],
      fieldSize
    });

    return this.req.get(`${otherResources["posts"]}/${postId}/comments`, {params});
  };

  create = ({ content, postId, userId }) =>
    this.req.post(`${resource}`, {
      data: {
        content,
        postId,
        userId
      }
    });

  update = (id, { content }) =>
    this.req.put(`${resource}/${id}`, {
      data: {
        content
      }
    });

  delete = id => this.req.delete(`${resource}/${id}`);
}
export default CommentRepository;
