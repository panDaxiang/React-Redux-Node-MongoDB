import { Table, Button, Icon } from "antd";
import axios from "axios";

class EditableTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      count: 2,
      columns: [
        { title: "用户名", dataIndex: "name", width: 200 },
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

    this.handleAdd = this.handleAdd.bind(this);
  }

  componentDidMount() {
    this.getUserList();
  }

  // 获取用户
  getUserList(params) {
    axios
      .get("/user/list", {
        params
      })
      .then(res => {
        let data = res.data;
        data.forEach(element => {
          element.key = element._id;
        });
        this.setState({
          dataSource: data
        });
      });
  }

  // 新增用户
  handleAdd() {
    axios({
      method: "POST",
      url: "/user/add",
      data: {
        name: "小李",
        age: parseInt(Math.random() * 100),
        address: `黄兴公园佳木斯路${parseInt(Math.random() * 10000)}号`,
        tags: ["nice", "developer"]
      }
    }).then(res => {
      let data = res.data;
      if (data.code === 0) {
        this.getUserList();
      }
    });
  }

  render() {
    const columns = this.state.columns.map((col, index) => ({
      ...col
    }));

    return (
      <div style={{ width: "100vw", boxSizing: "border-box", padding: "15px" }}>
        <Button onClick={this.handleAdd} type="primary">
          新增用户
        </Button>

        <Button onClick={this.handleSearch} type="primary">
          查询列表
        </Button>
        <Table
          style={{ paddingTop: "15px" }}
          rowClassName={() => "editable-row"}
          // 边框
          bordered
          // 表格内容
          dataSource={this.state.dataSource}
          // 表格列的配置描述
          columns={columns}
        />
      </div>
    );
  }
}

export default EditableTable;
