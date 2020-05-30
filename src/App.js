import React,{Component} from 'react';
import { Navbar, NavbarBrand } from 'reactstrap'; 
import Menu from "./components/Menu";
import { DISHES } from './shared/dishes';
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES
    };
  }

  render(){
    return (
    <div>
        <Header />
        <Menu dishes={this.state.dishes} />
        <Footer />
    </div>
  );
  }
  
}

export default App;
