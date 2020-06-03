import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";

function DishDetail(props)  {

 const  RenderDish = ({dish}) => {
   console.log(props);
    return (
      <Card>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
 };


  const RenderComments = ({ comments }) => {
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
      </div>
    );
  };

    if (!props.dish) {
      return <div></div>;
    }

    const { dish,comments } = props;

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
             <RenderDish dish={dish} />
           </div>
           <div className="col-12 col-md-5 m-1">
             <RenderComments comments={comments} />
           </div>
         </div>
       </div>
     );
  
}

export default DishDetail;