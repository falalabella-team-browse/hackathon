const get = async (url, options) => {
  try {
    const headers = {};
    const { auth } = options;

    if (auth) {
      const token = window.localStorage.getItem("AUTH_TOKEN");
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, { method: "GET", headers });

    if (response.status !== 200) {
      return {
        success: false,
        data: null,
        message: response.statusText,
      };
    }

    const data = await response.json();

    return data;
  } catch (e) {
    return {
      success: false,
      data: null,
      message: e.message,
    };
  }
};

const post = async (url, body, options = {}) => {
  try {
    const headers = {};
    const { auth } = options;

    if (auth) {
      const token = window.localStorage.getItem("AUTH_TOKEN");
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
    });

    if (response.status !== 200) {
      return {
        success: false,
        data: null,
        message: response.statusText,
      };
    }

    const data = await response.json();

    return data;
  } catch (e) {
    return {
      success: false,
      data: null,
      message: e.message,
    };
  }
};

module.exports = { get, post };
