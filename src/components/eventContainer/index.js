import React, {Component}  from 'react';
import EventHeaderBox from '../eventHeaderBox';
import EventTagBox from '../eventTagsBox';
import EventBox from '../eventBox';
import './index.css'
import Axios from 'axios'

class EventContainer extends Component{
    constructor(){
        super();

        this.state = {
            isLoading : true,
            event_List : [],
            event_category : "ALL_EVENTS",
            event_sub_category : "Upcoming",
            tagList : [],
            offset : 0
        }


    }

    updateEvent(event_category, event_sub_category){
        this.setState({event_category, event_sub_category, isLoading: true});
    }

    updateTagList(tagList){
        this.setState({tagList, isLoading: true});
    }

    componentDidMount(){

        const BaseURL = "https://api.codingninjas.com/api/v3/events?";
        const {event_category, event_sub_category, tagList, offset} = this.state;
        const tagListString = tagList.toString();
        Axios.get(BaseURL + `event_category=${event_category}&event_sub_category=${event_sub_category}&tag_list=${tagListString}&offset=${offset}`)
        .then((response)=>{
            let events = response.data.data.events.map((obj)=>{
                return obj;
            })
            this.setState({event_List : events, isLoading : false});
               
        })



    }

    componentDidUpdate(){
        if(this.state.isLoading){
            const BaseURL = "https://api.codingninjas.com/api/v3/events?";
            const {event_category, event_sub_category, tagList, offset} = this.state;
            const tagListString = tagList.toString();
            Axios.get(BaseURL + `event_category=${event_category}&event_sub_category=${event_sub_category}&tag_list=${tagListString}&offset=${offset}`)
            .then((response)=>{
                let events = response.data.data.events.map((obj)=>{
                    return obj;
                })
                this.setState({event_List : events, isLoading : false});
               
            })
        }
        // console.log(this.state);
    }
    render(){

        return(

            <div className="EventContainer">
                <EventHeaderBox functionFromParent={this.updateEvent.bind(this)}/>
                {(this.state.isLoading) ? (<div className="EventContainer-Content">                    
                    <h1 style = {{color : "grey"}}>Loading.......</h1>    
                    <EventTagBox functionFromParent={this.updateTagList.bind(this)}/>
                </div>) :  (<div className="EventContainer-Content">
                    
                    <EventBox eventDetails = {this.state.event_List}/>    
                    <EventTagBox functionFromParent={this.updateTagList.bind(this)}/>
                </div>)
                }
                
               
            </div>

        );

    }


}

export default EventContainer;
