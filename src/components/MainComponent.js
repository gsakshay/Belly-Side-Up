import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from "./HomeComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import Favorites from "./FavoriteComponent";
import { connect } from "react-redux";
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback, loginUser, logoutUser, fetchFavorites, postFavorite, deleteFavorite } from '../redux/ActionCreators';
import { actions } from "react-redux-form";
class Main extends Component {
  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId });
  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
    this.props.fetchFavorites();
    console.log("fav",this.props.favorites);
  }
  render() {
    const HomePage = () => {
      const dish = this.props.dishes.dishes.filter((dish) => dish.featured)[0];
      const promo = this.props.promotions.promotions.filter(
              (promo) => promo.featured
            )[0];
      const leader = this.props.leaders.leaders.filter(
        (leader) => leader.featured
      )[0];
      return (
        <Home
          dish={dish}
          dishesLoading={this.props.dishes.isLoading}
          dishErrMess={this.props.dishes.errMess}
          promotion={promo}
          promoLoading={this.props.promotions.isLoading}
          promoErrMess={this.props.promotions.errMess}
          leader={leader}
          leadersLoading={this.props.leaders.isLoading}
          leadersErrMess={this.props.leaders.errMess}
        />
      );
    };

    const DishWithId = ({ match }) => {
      console.log("This is authentication: ", this.props.auth.isAuthenticated);
      return this.props.auth.isAuthenticated ? (
        <DishDetail
          dish={
            this.props.dishes.dishes.filter(
              (dish) => dish._id === match.params.dishId
            )[0]
          }
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter(
            (comment) => comment.dish === match.params.dishId
          )}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
          favorite={this.props.favorites.favorites.dishes.some(
            (dish) => dish._id === match.params.dishId
          )}
          postFavorite={this.props.postFavorite}
        />
      ) : (
        <DishDetail
          dish={
            this.props.dishes.dishes.filter(
              (dish) => dish._id === match.params.dishId
            )[0]
          }
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter(
            (comment) => comment.dish === match.params.dishId
          )}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
          favorite={false}
          postFavorite={this.props.postFavorite}
        />
      );
    };

    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={(props) =>
          this.props.auth.isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/home",
                state: { from: props.location },
              }}
            />
          )
        }
      />
    );

    return (
      <div>
        <Header
          auth={this.props.auth}
          loginUser={this.props.loginUser}
          logoutUser={this.props.logoutUser}
        />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route
            exact
            path="/menu"
            component={() => <Menu dishes={this.props.dishes} />}
          />
          <Route
            exact
            path="/contactus"
            component={() => (
              <Contact
                resetFeedbackForm={this.props.resetFeedbackForm}
                postFeedback={this.props.postFeedback}
              />
            )}
          />
          <Route path="/menu/:dishId" component={DishWithId} />
          <PrivateRoute
            exact
            path="/favorites"
            component={() => (
              <Favorites
                favorites={this.props.favorites}
                deleteFavorite={this.props.deleteFavorite}
              />
            )}
          />
          <Route
            exact
            path="/aboutus"
            component={() => (
              <About
                leaders={this.props.leaders.leaders}
                isLoading={this.props.leaders.isLoading}
                errMsg={this.props.leaders.errMsg}
              />
            )}
          />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}
  
  const mapStateToProps = (state) => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders,
      favorites: state.favorites,
      auth: state.auth,
    };
  }

    const mapDispatchToProps = (dispatch) => ({
      postComment: (dishId, rating, author, comment) =>
        dispatch(postComment(dishId, rating, author, comment)),
      fetchDishes: () => {
        dispatch(fetchDishes());
      },
      resetFeedbackForm: () => {
        dispatch(actions.reset("feedback"));
      },
      fetchComments: () => dispatch(fetchComments()),
      fetchPromos: () => dispatch(fetchPromos()),
      fetchLeaders: () => dispatch(fetchLeaders()),
      postFeedback: (values) => dispatch(postFeedback(values)),
      loginUser: (creds) => dispatch(loginUser(creds)),
      logoutUser: () => dispatch(logoutUser()),
      fetchFavorites: () => dispatch(fetchFavorites()),
      postFavorite: (dishId) => dispatch(postFavorite(dishId)),
      deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId)),
    });


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));