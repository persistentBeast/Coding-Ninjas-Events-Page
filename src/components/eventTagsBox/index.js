import React, {Component} from 'react';
import Axios from 'axios'
import './index.css'
class EventTagBox extends Component{

    constructor(props){
        super(props);

        this.state = {
            TagList: [],
            SelectedTags : []
        }

        this.onClick = this.onClick.bind(this);

    }

    componentDidMount(){

        Axios.get('https://api.codingninjas.com/api/v3/event_tags')
        .then((response)=>{
            const tagList = response.data.data.tags;
            this.setState({TagList : tagList});
        })
        .catch((err)=>{
            console.log(err);
        })

    }

    onClick(tag){

        const isTagSelected = this.state.SelectedTags.find((ele)=>ele===tag);
        let updatedSelectedTags = this.state.SelectedTags;
        if(!isTagSelected){            
            updatedSelectedTags.push(tag);
            this.setState({SelectedTags:updatedSelectedTags});
        }else{
            updatedSelectedTags =  updatedSelectedTags.filter((ele) => ele!==tag);
            this.setState({SelectedTags:updatedSelectedTags});
        }

        this.props.functionFromParent(updatedSelectedTags);


    }

    // componentDidUpdate(){
    //     console.log(this.state);
    // }

    render(){

        return (

            <div className="Tags-Container">
                <h3 className="Tags-Container-Header">Tags</h3>
                {this.state.TagList.map((tag)=>{
                    let classToBeAdded;
                    if(!this.state.SelectedTags.find((ele)=> ele===tag)){
                        classToBeAdded = "Tags"
                    }else{
                        classToBeAdded = "Tags Tags-Selected"
                    }
                    return (<div className={classToBeAdded} onClick = {()=> {
                        return this.onClick(tag);
                    }}>{tag}</div>)
                })}

            </div>

        );
        
    }


}

export default EventTagBox;
