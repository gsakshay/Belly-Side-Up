import React,{Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,CardTitle } from 'reactstrap';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

class Dishdetail extends Component{
	constructor(props){
		super (props);
		this.state={

		}
	}

	render(){

			const comments = this.props.dish.comments.map((comment)=>{
						if(comment!==null){
							return(
								<ListGroupItem className="col">
							        <ListGroupItemHeading>{comment.comment}</ListGroupItemHeading>
							        <ListGroupItemText>
							        {comment.author}{comment.date}
						        	</ListGroupItemText>
						        </ListGroupItem>
								);
						}
						else {
							return(
								<div></div>);
						}
						})	
			


			console.log(this.props);
            return(
            	<div className="row">
            	
                  {(this.props.dish!==null)?
                  	(<Card className="col">
                    <CardImg top src={this.props.dish.image} alt={this.props.dish.name} />
                    <CardBody>
                      <CardTitle>{this.props.dish.name}</CardTitle>
                      <CardText>{this.props.dish.description}</CardText>
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
}

export default Dishdetail;

