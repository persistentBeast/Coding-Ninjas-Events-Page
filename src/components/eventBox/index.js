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

                
                {(this.props.eventDetails.length==0) ? (<div className="EventContainer-Content"><h2 className = "NoEvents-Message">Sorry!! No Events available currently. Please Check later.</h2></div>) : (this.props.eventDetails.map((event)=>{
                    return generateEventCard(event);
                }))}              

                
                
            </div>
        );
        
    }

}

export default EventBox;
