import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,CardTitle } from 'reactstrap';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

function Dishdetail(props) {
	const comments = props.dish.comments.map((comment)=>{
						if(comment!==null){
							return(
								<ListGroupItem className="col">
							        <ListGroupItemHeading>{comment.comment}</ListGroupItemHeading>
							        <ListGroupItemText>
							        <p>{comment.author}</p>
							        <p>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
						        	</ListGroupItemText>
						        </ListGroupItem>
								);
						}
						else {
							return(
								<div></div>);
						}
						})	
			


			console.log(props);
            return(
            	<div className="row">
            	
                  {(props.dish!==null)?
                  	(<Card className="col">
                    <CardImg top src={props.dish.image} alt={props.dish.name} />
                    <CardBody>
                      <CardTitle>{props.dish.name}</CardTitle>
                      <CardText>{props.dish.description}</CardText>
                    </CardBody>
                  </Card>):
                  
                  
                  	(<div></div>)
                  }
                  
                  <Card>
             
                  	<ListGroup>
                  		{comments}
				    </ListGroup>  
			 
				   </Card>
				
               </div>
            );
        
	}
	
	

	
export default Dishdetail;

