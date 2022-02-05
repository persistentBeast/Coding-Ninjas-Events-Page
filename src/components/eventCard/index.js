import "./index.css"

function generateEventCard(props){

    const {id, name, short_desc, mobile_cover_picture, venue, event_start_time, fees, registered_users, card_tags} = props;

    return (

        <div key={id} className="event-card">
            <div className="event-img-box">
                <img  src={mobile_cover_picture}/>
            </div>
            <div className="event-title">
                {name}
            </div>
            <div className="event-details">
                <div className="event-details-item">
                    Starts On <span>27 Feb 2022</span>
                </div>
                <div className="event-details-item">
                    Entry Fee <span>{fees==0 ? "Free" : fees}</span>
                </div>
                <div className="event-details-item">
                    Venue <span>{venue}</span>
                </div>
            </div>
            <hr/>
            <div className="event-description">
                <p>{short_desc}</p>
            </div>
            <div className="event-tags-container">
                {card_tags.map((tag)=>{
                    return <div className="event-tags-container-items">{tag}</div>
                })}
                
            </div>
            <hr/>           
            <div className="event-footer">
                <div className="event-footer-item">
                   {registered_users.top_users.map((user)=>{
                       return <img className = "event-footer-item-userimg" src={user.image_url}/>
                   })}
                   {(registered_users.other_users_count!==0)?<span>and <b>{registered_users.other_users_count} </b> others are participating.</span> : <span>No participants.</span>}
                </div>
                <div className="event-footer-item">
                    <button className="event-footer-button">Register Now</button>
                </div>
            </div>

        </div>


    )


}

export default generateEventCard;