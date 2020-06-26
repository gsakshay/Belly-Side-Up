import React,{Component} from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Row,
  Col,
  Label,
  CardImgOverlay,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

/* const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len; */


function DishDetail(props)  {

 const RenderDish = ({ dish, favorite, postFavorite }) => {
   console.log(props);
   return (
     <Card>
       <CardImg top src={baseUrl + dish.image} alt={dish.name} />
       <CardImgOverlay>
         <Button
           outline
           color="primary"
           onClick={() =>
             favorite ? console.log("Already favorite") : postFavorite(dish._id)
           }
         >
           {favorite ? (
             <span className="fa fa-heart"></span>
           ) : (
             <span className="fa fa-heart-o"></span>
           )}
         </Button>
       </CardImgOverlay>
       <CardBody>
         <CardTitle>{dish.name}</CardTitle>
         <CardText>{dish.description}</CardText>
       </CardBody>
     </Card>
   );
 };

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
  }

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSubmit = values => {
    this.toggleModal();
    console.log("Current State is: " + JSON.stringify(values));
    this.props.postComment(
      this.props.dishId,
      values.rating,
      values.comment
    );
  }

  render() {
    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"></span> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Col>
                  <Label htmlFor="rating">Rating</Label>
                  <Control.select
                    model=".rating"
                    id="rating"
                    className="form-control"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Col>
                  <Label htmlFor="comment">Comment</Label>
                  <Control.textarea
                    model=".comment"
                    id="comment"
                    rows="6"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Button type="submit" className="bg-primary">
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}


  const RenderComments = ({ comments, postComment, dishId }) => {
    if (!comments) {
      return <div></div>;
    }
    return (
      <div>
        <h4>Comments</h4>
        {comments.map(({ id, author, date, comment }) => (
          <div key={id}>
            <div>{comment}</div>
            <div>
              --{author}, {date}
            </div>
          </div>
        ))}
        <CommentForm dishId={dishId} postComment={postComment} />
      </div>
    );
  };


  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.dish != null){
    const { dish } = props;
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish
              dish={dish}
              favorite={props.favorite}
              postFavorite={props.postFavorite}
            />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments
              comments={props.comments}
              postComment={props.postComment}
              dishId={props.dish.id}
            />
          </div>
        </div>
      </div>
    );  
  }

     
  
}

export default DishDetail;