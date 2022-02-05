import React, {Component}  from 'react';
import EventHeaderBox from '../eventHeaderBox';
import EventTagBox from '../eventTagsBox';
import EventBox from '../eventBox';
import './index.css';
import Axios from 'axios';
import showSpinner from '../loadingSpinner';

class EventContainer extends Component{
    constructor(){
        super();

        this.state = {
            isLoading : true,
            event_List : [],
            event_category : "ALL_EVENTS",
            event_sub_category : "Upcoming",
            tagList : [],
            offset : 0,
            page : 1,
            total_pages : 1
        }

        this.onClickNextPage = this.onClickNextPage.bind(this);
        this.onClickPrevPage = this.onClickPrevPage.bind(this);

    }

    updateEvent(event_category, event_sub_category){
        this.setState({event_category, event_sub_category, isLoading: true, page : 1, offset : 0});
    }

    updateTagList(tagList){
        this.setState({tagList, isLoading: true, page : 1, offset : 0});
    }

    onClickNextPage(){
        if(this.state.total_pages>this.state.page){
            this.setState({page : this.state.page + 1, offset : this.state.offset+20, isLoading : true});
        }
    }

    onClickPrevPage(){
        if(this.state.page>1){
            this.setState({page : this.state.page - 1, offset : this.state.offset-20, isLoading : true});
        }
    }

    componentDidMount(){

        const BaseURL = "https://api.codingninjas.com/api/v3/events?";
        const {event_category, event_sub_category, tagList, offset} = this.state;
        const tagListString = tagList.toString();
        Axios.get(BaseURL + `event_category=${event_category}&event_sub_category=${event_sub_category}&tag_list=${tagListString}&offset=${offset}`)
        .then((response)=>{
            let total_pages = response.data.data.page_count;
            let events = response.data.data.events.map((obj)=>{
                return obj;
            })
            this.setState({event_List : events, isLoading : false, total_pages});               
        })

    }

    componentDidUpdate(){
        if(this.state.isLoading){
            const BaseURL = "https://api.codingninjas.com/api/v3/events?";
            const {event_category, event_sub_category, tagList, offset} = this.state;
            const tagListString = tagList.toString();
            Axios.get(BaseURL + `event_category=${event_category}&event_sub_category=${event_sub_category}&tag_list=${tagListString}&offset=${offset}`)
            .then((response)=>{
                let total_pages = response.data.data.page_count;
                let events = response.data.data.events.map((obj)=>{
                    return obj;
                })
                this.setState({event_List : events, isLoading : false, total_pages});
            })
        }
        // console.log(this.state);
    }
    
    render(){


        return (

            <div className="EventContainer">
                <EventHeaderBox functionFromParent={this.updateEvent.bind(this)}/>
                {(this.state.isLoading) ? (<div className="EventContainer-Content">                    
                    {showSpinner()}
                    <EventTagBox functionFromParent={this.updateTagList.bind(this)}/>
                </div>) : (<div className="EventContainer-Content">                    
                    <EventBox eventDetails = {this.state.event_List}/>    
                    <EventTagBox functionFromParent={this.updateTagList.bind(this)}/>
                    <div className="Event-Container-Footer">
                        <button onClick = {this.onClickPrevPage} className="Event-Container-Footer-Button"><img src="https://files.codingninjas.in/left-arrow-5581.svg"/></button>
                        <span className="Event-Container-Footer-PageNo">Page {this.state.page} of {this.state.total_pages}</span>
                        <button onClick = {this.onClickNextPage} className="Event-Container-Footer-Button"><img src ="https://files.codingninjas.in/right-arrow-5582.svg"/></button>
                    </div>
                </div>)
                }
            </div>

        );

    }


}

export default EventContainer;
