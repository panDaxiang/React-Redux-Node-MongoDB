import { Table, Button, Icon } from "antd";
import { connect } from "react-redux";

import { getUserList, addUserInfo11 } from "@store/tableReducer";
import UserModal from "@component/userModal/userModal";

class EditableTable extends Component {
  constructor(props) {
    super(props);
    this.addUserInfo = this.addUserInfo.bind(this);
  }

  componentDidMount() {
    this.props.getUserList();
  }

  addUserInfo(params) {
    this.props.addUserInfo(params);
  }

  // 新增用户
  // handleAdd() {
  //   axios({
  //     method: "POST",
  //     url: "/user/add",
  //     data: {
  //       name: "小李",
  //       age: parseInt(Math.random() * 100),
  //       address: `黄兴公园佳木斯路${parseInt(Math.random() * 10000)}号`,
  //       tags: ["nice", "developer"]
  //     }
  //   }).then(res => {
  //     let data = res.data;
  //     if (data.code === 0) {
  //       this.getUserList();
  //     }
  //   });
  // }

  render() {
    const { dataSource, columns } = this.props;
    return (
      <div style={{ width: "100vw", boxSizing: "border-box", padding: "15px" }}>
        <Button onClick={this.handleSearch} type="primary" className="right">
          查询列表
        </Button>

        <UserModal
          name="新增用户"
          title="新增用户"
          addUserInfo={this.addUserInfo}
        />

        <Table
          style={{ paddingTop: "15px" }}
          rowClassName={() => "editable-row"}
          // 边框
          bordered
          // 表格内容
          dataSource={dataSource}
          // 表格列的配置描述
          columns={columns}
        />
      </div>
    );
  }
}

const mapState = state => ({
  dataSource: state.table.dataSource,
  columns: state.table.columns
});

const mapDispatch = dispatch => ({
  getUserList() {
    getUserList(dispatch, {});
  },
  addUserInfo(data) {
    addUserInfo11(dispatch, data)
  }
});

export default connect(
  mapState,
  mapDispatch
)(EditableTable);
