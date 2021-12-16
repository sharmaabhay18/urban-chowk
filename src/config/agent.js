import axios from "axios";
import { tokenListener } from "utils/firebase";

import config from "../utils/configConstant";

require('dotenv').config()

//This will check, which urls to use
const develop = process.env.REACT_APP_NODE_ENV === "development";

const CLOUD = {
  LOCAL: {
    API_ROOT: "http://localhost:8080/",
  },
  SERVER: {
    API_ROOT: process.env.REACT_APP_API,
  },
};
let URL = {};
console.log("agent=====>", process.env.REACT_APP_API)
if (develop) {
  URL = Object.assign({}, CLOUD.LOCAL);
} else {
  URL = Object.assign({}, CLOUD.SERVER);
}


tokenListener();

const authToken = localStorage.getItem(config.AUTH_TOKEN);
axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;

const requests = {
  get: async (url, tokenForAPI) => {
    return axios
      .get(URL.API_ROOT + url, tokenForAPI)
      .then((res) => {
        return res;
      })
      .catch((res) => {
        throw res;
      });
  },

  post: async (url, body, tokenForAPI) => {
    return axios
      .post(URL.API_ROOT + url, body, tokenForAPI)
      .then((res) => {
        return res;
      })
      .catch((e) => {
        throw e.response;
      });
  },

  put: async (url, body, tokenForAPI) => {
    return axios
      .put(URL.API_ROOT + url, body, tokenForAPI)
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
        throw res.response;
      });
  },

  delete: async (url) => {
    return axios
      .delete(URL.API_ROOT + url)
      .then((res) => {
        return res;
      })
      .catch((res) => {
        throw res;
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
  login: async (token) => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return await requests.get("user/login", token);
    } catch (e) {
      throw e;
    }
  },
  checkMobile: async (payload) => {
    try {
      return await requests.post("user/checkMobile", payload);
    } catch (error) {
      throw error;
    }
  }
};

const User = {
  getInfo: async () => {
    try {
      return await requests.get("user/");
    } catch (error) {
      throw error;
    }
  },
  updateUser: async (payload) => {
    try {
      return await requests.patch("user/", payload);
    } catch (error) {
      throw error;
    }
  },
};

const Testimonial = {
  getAll: async () => {
    try {
      return await requests.get("testimonial/");
    } catch (error) {
      throw error;
    }
  },
  add: async (payload) => {
    try {
      return await requests.post("testimonial/add", payload);
    } catch (error) {
      throw error;
    }
  },
  delete: async (id) => {
    try {
      return await requests.delete(`testimonial/${id}`);
    } catch (error) {
      throw error;
    }
  },
};

const Items = {
  getAllItems: async () => {
    try {
      return await requests.get(`item/`);
    } catch (error) {
      throw error;
    }
  },
  getAll: async (id) => {
    try {
      return await requests.get(`item/${id}`);
    } catch (error) {
      throw error;
    }
  },
  add: async (payload) => {
    try {
      return await requests.post("item/add", payload);
    } catch (error) {
      throw error;
    }
  },
  delete: async (id) => {
    try {
      return await requests.delete(`item/${id}`);
    } catch (error) {
      throw error;
    }
  },
  getItemsList: async (id) => {
    try {
      return await requests.get(`item/get/${id}`);
    } catch (error) {
      throw error;
    }
  },
};

const Order = {
  getAllOrder: async () => {
    try {
      return await requests.get(`order/all`);
    } catch (error) {
      throw error;
    }
  },
  getAll: async () => {
    try {
      return await requests.get(`order`);
    } catch (error) {
      throw error;
    }
  },
  add: async (payload) => {
    try {
      return await requests.post("order/add", payload);
    } catch (error) {
      throw error;
    }
  },
  updateStatus: async (id, payload) => {
    try {
      return await requests.patch(`order/${id}`, payload);
    } catch (error) {
      throw error;
    }
  },
};

const Category = {
  getAll: async () => {
    try {
      return await requests.get("category/");
    } catch (error) {
      throw error;
    }
  },
  add: async (payload) => {
    try {
      return await requests.post("category/add", payload);
    } catch (error) {
      throw error;
    }
  },
  delete: async (id) => {
    try {
      return await requests.delete(`category/${id}`);
    } catch (error) {
      throw error;
    }
  },
};

const Coupon = {
  getAll: async () => {
    try {
      return await requests.get("coupon/");
    } catch (error) {
      throw error;
    }
  },
  add: async (payload) => {
    try {
      return await requests.post("coupon/add", payload);
    } catch (error) {
      throw error;
    }
  },
  delete: async (id) => {
    try {
      return await requests.delete(`coupon/${id}`);
    } catch (error) {
      throw error;
    }
  },
};

const Address = {
  getAll: async () => {
    try {
      return await requests.get("customerAddress/");
    } catch (error) {
      throw error;
    }
  },
  add: async (payload) => {
    try {
      return await requests.post("customerAddress/add", payload);
    } catch (error) {
      throw error;
    }
  },
  delete: async (id) => {
    try {
      return await requests.delete(`customerAddress/${id}`);
    } catch (error) {
      throw error;
    }
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  Auth,
  URL,
  Testimonial,
  User,
  Coupon,
  Items,
  Category,
  Address,
  Order
};
