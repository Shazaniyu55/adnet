import axios from "axios";
import { SWExtra, User } from "../types/userInfo";

export const getUserInfo = async (userId: string) => {
  let data;
  let error;
  if (userId) {
    try {
      const res = await axios({
        method: "GET",
        url: `${process.env.SMNK_URL}api/personal-info/${userId}`,
      });
      data = await res.data;
    } catch (err: any) {
      console.log(err);
      error = err;
    }
  } else {
    return { data, error };
  }
  return { data, error };
};
export const isUserVerified = async (userId: string) => {
  let data;
  let error;
  if (userId) {
    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.SMNK_URL}api/personal-info/verified`,
        data:{userId}
      });
      data = await res.data;
    } catch (err: any) {
      console.log(err);
      error = err;
    }
  } else {
    return { data, error };
  }
  return { data, error };
};
export const getUserverification = async (userId: string) => {
  let data;
  let error;
  if (userId) {
    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.SMNK_URL}api/personal-info/verification`,
        data:{userId}
      });
      data = await res.data;
    } catch (err: any) {
      console.log(err);
      error = err;
    }
  } else {
    return { data, error };
  }
  return { data, error };
};
export const getSWExtraDetails = async (userId: string) => {
  let data;
  let error;
  if (userId) {
    try {
      const res = await axios({
        method: "GET",
        url: `${process.env.SMNK_URL}api/sw/extra/${userId}`,
      });
      data = await res.data;
    } catch (err: any) {
      console.log(err);
      error = err;
    }
  } else {
    return { data, error };
  }
  return { data, error };
};
export const getUserDp =  async(userId: string) => {
    if (userId) {
    try {
      const res = await axios({
        method: "GET",
        url: `${process.env.SMNK_URL}api/users/dp/${userId}`,
      });
      const data = await res.data;
      return data;
    } catch (err: any) {
      console.log(err);
      const error = err;
      return error;
    }
  }
}
export const getUserName =  async(userId: string) => {
  if (userId) {
  try {
    const res = await axios({
      method: "GET",
      url: `${process.env.SMNK_URL}api/profile/name/${userId}`,
    });
    const data = await res.data;
    return data;
  } catch (err: any) {
    console.log(err);
    const error = err;
    return error;
  }
}
}
export const getUserProfile = async (userId: string) => {
  let data;
  let error;
  if (userId) {
    try {
      const res = await axios({
        method: "GET",
        url: `${process.env.SMNK_URL}api/profile/${userId}`,
      });
      data = await res.data;
    } catch (err: any) {
      console.log(err);
      error = err;
    }
  } else {
    return { data, error };
  }
  return { data, error };
};
export const getUserRating = async (userId: string) => {
  let data;
  let error;
  if (userId) {
    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.SMNK_URL}api/users/rating`,
        data:{userId}
      });
      data = await res.data;
    } catch (err: any) {
      console.log(err);
      error = err;
    }
  } else {
    return { data, error };
  }
  return { data, error };
};
export const getJobsDoneByUser = async (userId: string) => {
  let data;
  let error;
  if (userId) {
    try {
      const res = await axios({
        method: "GET",
        url: `${process.env.SMNK_URL}api/job/done/${userId}`,
      });
      data = await res.data;
    } catch (err: any) {
      console.log(err);
      error = err;
    }
  } else {
    return { data, error };
  }
  return { data, error };
};
export const getClientJobHistory = async (userId: string) => {
  let data;
  let error;
  if (userId) {
    try {
      const res = await axios({
        method: "GET",
        url: `${process.env.SMNK_URL}api/job/client/${userId}`,
      });
      data = await res.data;
    } catch (err: any) {
      console.log(err);
      error = err;
    }
  } else {
    return { data, error };
  }
  return { data, error };
};
export const getCompanyProfile = (userId: string) => {
  const res = async () => {
    try {
      const res = await axios(
        `${process.env.SMNK_URL}api/company-profile/${userId}`
      );
      const data = await res.data;
      return data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  return res;
};

export const getUserExp = async (userId: string) => {
  let data;
  let error;

  try {
    const res = await axios({
      method: "POST",
      url: `${process.env.SMNK_URL}api/sw-dashboard/experience/${userId}`,
    });
    data = await res.data;
  } catch (err: any) {
    error = err;
  }
  return { data, error };
};

export const getUserServices = async (userId: string) => {
  let data;
  let error;
  try {
    const res = await axios({
      method: "POST",
      url: `${process.env.SMNK_URL}api/sw-dashboard/service/${userId}`,
    });
    data = await res.data;
  } catch (err: any) {
    error = err;
  }
  return { data, error };
};
export const getUserBankDetails = (userId: string) => {
  const res = async () => {
    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.SMNK_URL}api/sw-dashboard/bank-details/${userId}`,
      });
      const data = await res.data;
      return data;
    } catch (err: any) {
      console.log(err);
      return err;
    }
  };
  return res;
};

export const userJSON = () => {
  if (typeof window !== "undefined") {
    // Perform localStorage action
    const userStr = localStorage.getItem("user");
    //console.log(userStr)
    if (userStr) {
      const user = JSON.parse(JSON.stringify(userStr));
      if (user !== "undefined") {
        //console.log(user )
        return JSON.parse(user) as User;
      }
    }
  }
  return {} as User;
};
export const swExtraJSON = () => {
  if (typeof window !== "undefined") {
    // Perform localStorage action
    const swExtraStr = localStorage.getItem("swExtra");
    //console.log(userStr)
    if (swExtraStr) {
      const swExtra = JSON.parse(JSON.stringify(swExtraStr));
      if (swExtra !== "undefined") {
        //console.log(user )
        return JSON.parse(swExtra) as SWExtra;
      }
    }
  }
  return {} as SWExtra;
};


export const infoJSON = () => {
  if (typeof window !== "undefined") {
    // Perform localStorage action
    const infoStr = localStorage.getItem("info");
    if (!null) {
      const info = JSON.parse(JSON.stringify(infoStr));
      //console.log(JSON.parse(info))
      return JSON.parse(info);
    }
  }
};
