import axios from "axios";
// import Cookies from "js-cookie";
// export const base_Url = `http://35.154.48.96/api/v1`;
// export const base_Url = `https://sportzclub.in/api/v1`;
export const base_Url_local = "http://localhost:4000/cars/"

export const postData = async (apiUrl, formData) => {

  try {
    let headers = {};
    // const token = localStorage.getItem("adminToken")
    //   ? localStorage.getItem("adminToken")
    //   : localStorage.getItem("token");

    // if (token) {
    //   headers = {
    //     Authorization: `Bearer ${token}`,
    //   };
    // }

    console.log(formData);
    console.log(apiUrl);
    
    const res = await axios.post(apiUrl, formData, { headers });
    console.log(res);
    return res.data;
  } catch (error) {
    if (error.response && (error.response.status === 403 || error.response.status === 401)) {
      throw error;
    } else {
      throw error;
    }
  }
};

export const fetchData = async (apiUrl) => {


  try {

    let headers = {};
    // const token = localStorage.getItem("adminToken")
    //   ? localStorage.getItem("adminToken")
    //   : localStorage.getItem("token");
    // if (token) {
    //   headers = {
    //     Authorization: `Bearer ${token}`,
    //   };
    // }
    const res = await axios.get(apiUrl, { headers });

    return res.data;
  } catch (error) {
    if (
      error.response &&
      (error.response.status === 403 || error.response.status === 401)
    ) {
      console.error("Error posting data:", error.message);
      // redirect("/");
    } else {
      throw error;
    }
  }
};

export const editData = async (apiUrl, formData) => {
  // const referCode = Cookies.get("refer_code");
  // console.log(referCode);


  try {

  // if(referCode){
  //   apiUrl += `?refer_code=${referCode}`
  // }
    // let headers = {};
    // const token = localStorage.getItem("adminToken")
    //   ? localStorage.getItem("adminToken")
    //   : localStorage.getItem("token");
    // if (token) {
    //   headers = {
    //     Authorization: `Bearer ${token}`,
    //   };
    // }
    const res = await axios.patch(apiUrl, formData, { headers });
    return res.data;
  } catch (error) {
    if (
      error.response &&
      (error.response.status === 403 || error.response.status === 401)
    ) {
      console.error("Error posting data:", error.message);
      // redirect("/");
    } else {
      throw error;
    }
  }
};

export const updateData = async (apiUrl, formData) => {
  // const referCode = Cookies.get("refer_code");
  // console.log(referCode);


  try {

  // if(referCode){
  //   apiUrl += `?refer_code=${referCode}`
  // }
    let headers = {};
    // const token = localStorage.getItem("adminToken")
    //   ? localStorage.getItem("adminToken")
    //   : localStorage.getItem("token");
    // if (token) {
    //   headers = {
    //     Authorization: `Bearer ${token}`,
    //   };
    // }
    const res = await axios.put(apiUrl, formData, { headers });
    return res.data;
  } catch (error) {
    if (
      error.response &&
      (error.response.status === 403 || error.response.status === 401)
    ) {
      console.error("Error posting data:", error.message);
      // redirect("/");
    } else {
      throw error;
    }
  }
};

export const DeleteData = async (apiUrl, data) => {
  // const referCode = Cookies.get("refer_code");
  // console.log(referCode);


  try {

  // if(referCode){
  //   apiUrl += `?refer_code=${referCode}`
  // }
    let headers = {};
    // const token = localStorage.getItem("adminToken")
    //   ? localStorage.getItem("adminToken")
    //   : localStorage.getItem("token");
    // if (token) {
    //   headers = {
    //     Authorization: `Bearer ${token}`,
    //   };
    // }
    const res = await axios.delete(apiUrl, {
      headers,
      data,
    });
    return res.data;
  } catch (error) {
    console.log("Error Delete Data", error.message);
    throw error;
  }
};

// const getToken = () => {
//   const token = localStorage.getItem('token');
//   const adminToken = localStorage.getItem('adminToken');
//   return adminToken || token;
// };


// export const Uploadimage = async (url, data, headers = {}) => {
//   console.log(data, "------------------------");
//   for (let [key, value] of data.entries()) {
//     console.log(key, value);
//   }
//   const token = getToken();
//   const response = await axios.post(url, data, {
//     headers: {
//       ...(token && { Authorization: `Bearer ${token}` }),
//       ...headers,
//     },
//   });
//   return response.data;
// };


// export const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   return date.toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//   });
// };


// export const videoputRequest = async (url, data, headers = {}) => {
//   try {
//     const response = await axios.put(url, data, {
      
//     });
//     return response?.data;
//   } catch (error) {
//     handleError(error);
//   }
// };


export const truncateText = (text, maxLength = 100) => {
  if (!text) return "";
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};