import React, {Component}  from 'react';
import './index.css'

class EventHeaderBox extends Component{

    constructor(props){

        super(props);

        this.state = {

            event_category : "ALL_EVENTS",
            event_sub_category : "Upcoming"

        }

        this.onClickEventHeaderBoxEventCategory = this.onClickEventHeaderBoxEventCategory.bind(this);
        this.onClickEventHeaderBoxEventSubCategory = this.onClickEventHeaderBoxEventSubCategory.bind(this);

    }

    onClickEventHeaderBoxEventCategory(SelectedEventCategory){
        
        this.setState({event_category : SelectedEventCategory});
        this.props.functionFromParent(SelectedEventCategory, this.state.event_sub_category);
    }

    onClickEventHeaderBoxEventSubCategory(SelectedEventSubCategory){

        this.setState({event_sub_category : SelectedEventSubCategory});
        this.props.functionFromParent(this.state.event_category, SelectedEventSubCategory);

    }

    // componentDidUpdate(){
    //     console.log(this.state);
    // }

    render(){

        return(
            <div>
                <div className="EventHeaderBox">
                    <div className={this.state.event_category==="ALL_EVENTS"?"EventHeaderBoxitem Selected-EventCategory":"EventHeaderBoxitem"} onClick={() => this.onClickEventHeaderBoxEventCategory("ALL_EVENTS")}>All Events</div>
                    <div className={this.state.event_category==="WEBINAR"?"EventHeaderBoxitem Selected-EventCategory":"EventHeaderBoxitem"} onClick={() => this.onClickEventHeaderBoxEventCategory("WEBINAR")}>Webinars</div>
                    <div className={this.state.event_category==="CODING_EVENT"?"EventHeaderBoxitem Selected-EventCategory":"EventHeaderBoxitem"} onClick={() => this.onClickEventHeaderBoxEventCategory("CODING_EVENT")}>Coding Events</div>
                    <div className={this.state.event_category==="BOOTCAMP_EVENT"?"EventHeaderBoxitem Selected-EventCategory":"EventHeaderBoxitem"} onClick={() => this.onClickEventHeaderBoxEventCategory("BOOTCAMP_EVENT")}>Bootcamp Events</div>
                    <div className={this.state.event_category==="WORKSHOP"?"EventHeaderBoxitem Selected-EventCategory":"EventHeaderBoxitem"} onClick={() => this.onClickEventHeaderBoxEventCategory("WORKSHOP")}>Workshop</div>
                </div>
                <div className="EventHeaderBox">
                    <div className={this.state.event_sub_category==="Upcoming"?"EventHeaderBoxitem Selected-EventCategory":"EventHeaderBoxitem"}  onClick={() => this.onClickEventHeaderBoxEventSubCategory("Upcoming")}>Upcoming</div>
                    <div className={this.state.event_sub_category==="Archived"?"EventHeaderBoxitem Selected-EventCategory":"EventHeaderBoxitem"}  onClick={() => this.onClickEventHeaderBoxEventSubCategory("Archived")}>Archived</div>
                </div>
            

            </div>
            

        );



    }

}

export default EventHeaderBox;