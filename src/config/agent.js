import axios from "axios";

//This will check, which urls to use
const develop = true;

const CLOUD = {
  LOCAL: {
    API_ROOT: "http://localhost:8080/",
  },
  SERVER: {
    API_ROOT: "",
  },
};
let URL = {};

if (develop) {
  URL = Object.assign({}, CLOUD.LOCAL);
} else {
  URL = Object.assign({}, CLOUD.SERVER);
}

const requests = {
  get: (url, tokenForAPI) => {
    return axios
      .get(URL.API_ROOT + url, tokenForAPI)
      .then((res) => {
        return res;
      })
      .catch((res) => {
        return res;
      });
  },

  post: (url, body) => {
    return axios
      .post(URL.API_ROOT + url, body)
      .then((res) => {
        return res;
      })
      .catch((e) => {
        throw e.response;
      });
  },

  patch: (url, body, tokenForAPI) => {
    return axios
      .patch(URL.API_ROOT + url, body, tokenForAPI)
      .then((res) => {
        return res;
      })
      .catch((res) => {
        return res;
      });
  },
};

const Auth = {
  signUp: async (signupPayload) => {
    try {
      return await requests.post("user/register", signupPayload);
    } catch (e) {
      throw e;
    }
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  Auth,
  URL,
};
