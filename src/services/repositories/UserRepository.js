import Api from "../RequestBase";
import { parseParams } from "../../utilities";
const resource = "/users";
const SORT_BY = {
  fullname: 0
};
class UserRepository {
  constructor(requestInstance) {
    this.req = requestInstance;
  }

  get = ({
    query = "",
    pageNumber = 1,
    pageSize = 10,
    isDesc = true,
    sortBy = "fullname",
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

  create = ({ fullName, mail, avatarUrl }) =>
    this.req.post(`${resource}`, {
      fullName,
      mail,
      avatarUrl
    });

  update = (id, { fullName, mail, avatarUrl }) =>
    this.req.put(`${resource}/${id}`, {
      fullName,
      mail,
      avatarUrl
    });

  updateAdmin = (groupId, adminId) => {
    throw "Not implemented";
  };
  addAdmin = (groupId, adminId) => {
    throw "Not implemented";
  };

  delete = id => this.req.delete(`${resource}/${id}`);
}
export default UserRepository;
