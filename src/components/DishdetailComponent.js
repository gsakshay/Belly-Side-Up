import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle
} from 'reactstrap';

function DishDetail(props)  {
 const  renderDish = ({ name, image, description }) => (
    <Card>
      <CardImg top src={image} alt={name} />
      <CardBody>
        <CardTitle>{name}</CardTitle>
        <CardText>{description}</CardText>
      </CardBody>
    </Card>
  );


  const renderComments = ({ comments }) => {
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

    const { dish } = props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-5 m-1">{renderDish(dish)}</div>
          <div className="col-12 col-md-5 m-1">{renderComments(dish)}</div>
        </div>
      </div>
    );
  
}

export default DishDetail;