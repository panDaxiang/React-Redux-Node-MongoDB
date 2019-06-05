import { Provider } from "react-redux";
import 'babel-polyfill';

import store from "@store/store";
import EditableTable from "@pages/table/table";

import "./style.scss";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <EditableTable />
      </Provider>
    );
  }
}

ReactDOM.render(<App />, root);
