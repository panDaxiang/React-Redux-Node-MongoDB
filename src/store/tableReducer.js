import axios from "axios";
import { Icon } from "antd";

const GET_LIST = "GET_LIST";

const initState = {
  dataSource: [],
  columns: [
    { title: "用户名", dataIndex: "user", width: 200 },
    { title: "年龄", dataIndex: "age", width: 200 },
    { title: "标签", dataIndex: "tags", width: 200 },
    { title: "地址", dataIndex: "address", width: 300 },
    {
      title: "编辑",
      dataIndex: "edit",
      width: 80,
      render: () => (
        <a href="javascript:;">
          <Icon type="edit" />{" "}
        </a>
      )
    },
    {
      title: "删除",
      dataIndex: "delete",
      width: 80,
      render: () => (
        <a href="javascript:;">
          <Icon type="delete" />
        </a>
      )
    }
  ]
};

// 获取用户列表数据
export const getUserList = (dispatch, params) => {
  (async () => {
    try {
      let res = await axios.get("/user/list", { params });
      let data = res.data;
      data.forEach(element => {
        element.key = element._id;
      });
      dispatch({ type: GET_LIST, data });
    } catch (err) {
      console.log(err);
    }
  })();
};

export const addUserInfo11 = (dispatch, data) => {
  (async () => {
    try {
      let res = await axios({
        method: "POST",
        url: "/user/add",
        data: { 
          user:data.user,
          age:data.age,
          tags:data.tags,
          address:data.address
        }
      });
      if (res.data.code === 0) {
        getUserList(dispatch, {});
      }
    } catch (err) {
      console.log(err);
    }
  })();
};

export default (state = initState, action) => {
  switch (action.type) {
    case GET_LIST:
      return {
        ...state,
        dataSource: action.data
      };
    default:
      return state;
  }
};
