import React, {Component}  from 'react';
import "./index.css";
import generateEventCard from '../eventCard';

class EventBox extends Component{

    constructor(props){
        super(props);

    }

       

    render(){
        return (
            <div className="EventBox">
                {this.props.eventDetails.map((event)=>{
                    return generateEventCard(event);
                })
                }
            </div>
        );
        
    }

}

export default EventBox;
