import axios from "axios";

// const baseDomain = "http://192.168.1.200:8082";
const baseDomain = "http://192.168.1.24:8083";
const baseURL = `${baseDomain}/api`; // Incase of /api/v1;

const predefinedConfig = {
  headers: {
    Accept: "application/json"
  },
};

const appendPredefinedConf = conf => {
  let result = predefinedConfig;
  Object.keys(conf).forEach(key => {
    if (typeof conf[key] === "object") {
      let object = predefinedConfig[key] || {};

      Object.keys(conf[key]).forEach(innerKey => {
        if (conf[key][innerKey] !== undefined) {
          object[innerKey] = conf[key][innerKey];
        }
      });

      result[key] = object;
    }else{
      result[key] =  predefinedConfig[key] || conf[key];
    }
  });

  return result;
};
const Request = (config = {}) => {
  let baseConfig = {
    baseURL,
    ...appendPredefinedConf(config)
  };

  return axios.create(baseConfig);
};

export default Request;
