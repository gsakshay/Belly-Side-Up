import React,{Component} from 'react';
import "./App.css";
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Dishes } from "./redux/Dishes";
import { Comments } from "./redux/Comments";
import { Promotions } from "./redux/Promotions";
import { Leaders } from "./redux/Leaders";
import thunk from "redux-thunk";
import logger from "redux-logger";
 import { createForms } from "react-redux-form";
import { InitialFeedback } from "./redux/forms";
const store = createStore(
  combineReducers({
    dishes: Dishes,
    comments: Comments,
    promotions: Promotions,
    leaders: Leaders,
    ...createForms({
      feedback: InitialFeedback,
    }),
  }),
  applyMiddleware(thunk, logger)
);
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
