import HttpKit from "./HttpKit";

const { client } = HttpKit;

const ApiKit = {
  auth: {
    register: (payload) => {
      const url = "/auth/register";
      return client.post(url, payload);
    },
    login: (payload) => {
      const url = "/auth/login";
      return client.post(url, payload);
    },
  },

  user: {
    getMe: () => {
      const url = "/me";
      return client.get(url);
    },
    getUsers: () => {
      const url = "/users";
      return client.get(url);
    },
  },

  task: {
    createTask: (payload) => {
      const url = "/tasks";
      return client.post(url, payload);
    },
    getTasks: (params) => {
      const url = "/tasks";
      return client.get(url, { params });
    },
    getTask: (id) => {
      const url = `/tasks/${id}`;
      return client.get(url);
    },
    updateTask: (id, payload) => {
      const url = `/tasks/${id}`;
      return client.patch(url, payload);
    },
    deleteTask: (id) => {
      const url = `/tasks/${id}`;
      return client.delete(url);
    },
  },
};

export default ApiKit;
