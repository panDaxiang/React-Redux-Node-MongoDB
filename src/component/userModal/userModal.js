import { Modal, Button, Input, Select } from "antd";
const { Option } = Select;

class UserModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      user: "",
      age: "",
      tags: [],
      address: ""
    };
  }

  // 保存信息
  setModalVisible(modalVisible, save) {
    if (save) {
      const { user, age, tags, address } = this.state;
      this.props.addUserInfo({ user, age, tags, address });
    }

    this.setState({ modalVisible });
  }

  handleChange(type, val) {

    this.setState({
      [type]: event.target.value
    });

    if(val){
      this.setState({
        [type]: val
      });
    }
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={() => this.setModalVisible(true)}>
          {this.props.name}
        </Button>
        <Modal
          title={this.props.title}
          centered
          visible={this.state.modalVisible}
          onOk={() => this.setModalVisible(false, true)}
          onCancel={() => this.setModalVisible(false)}
          destroyOnClose={true}
          okText="保存"
          cancelText="取消"
        >
          <div>
            <Input
              addonBefore="用户名"
              onChange={() => this.handleChange("user")}
              style={{ display: "block", marginBottom: "15px" }}
              value={this.state.user}
            />
            <Input
              addonBefore="年龄"
              onChange={() => this.handleChange("age")}
              style={{ display: "block", marginBottom: "15px" }}
              value={this.state.age}
            />
            <div style={{ marginBottom: "15px", display: "flex" }}>
              <span style={{ width: "60px" }}>标签</span>
              <Select
                mode="multiple"
                style={{ flex: "1" }}
                placeholder="请选择"
                defaultValue={[]}
                onChange={v => this.handleChange("tags", v)}
              >
                <Option key="程序员">程序员</Option>
                <Option key="帅哥">帅哥</Option>
                <Option key="有钱人">有钱人</Option>
                <Option key="阳光男孩">阳光男孩</Option>
              </Select>
            </div>

            <Input
              addonBefore="地址"
              onChange={() => this.handleChange("address")}
              style={{ display: "block", marginBottom: "15px" }}
              value={this.state.address}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

export default UserModal;
