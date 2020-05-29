import axios from "axios";

const validUserId = async (success: Function, err?: Function) => {
  let url = "http://18.217.232.233:8080/login";
  let opt = {
    headers: { "content-type": "application/json" },
    withCredentials: true,
  };
  try {
    let res = await axios.post(url, {}, opt);

    res.status === 200 && (await success(res));
  } catch (error) {
    if (error.response.status === 404) {
      err && alert("login이 필요합니다!");
      err && err();
    }
  }
};

export default validUserId;
