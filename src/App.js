import React,{Component} from 'react';
import "./App.css";
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { createStore } from "redux";
import Reducer from "./redux/Reducer";

const store = createStore(Reducer);
class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
