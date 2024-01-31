import React from 'react'

// constructor run when we use super in it.
const NewsItem = (props) => {
    //    constructor(){
    //     super();
    //     console.log('Hello i am a coonstructor!')
    //    }

        let { title, description, imageUrl, newsUrl,author,date,source,Ccolor} = props;
        return (
            <div>
                <div className="card" style={{ width: "18rem" }}>
                    <div style={{display: 'flex' ,justifyContent: 'flex-end' ,position: 'absolute' ,right: '0'}}>
                    <span className={`badge rounded-pill bg-${Ccolor}`} style={{left: '90%', zIndex: '1'}}>
                        {source}</span>
                    </div>
                    <img src={!imageUrl ? "https://www.techexplorist.com/wp-content/uploads/2023/01/neutron-star-merger.jpg" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}...</p>
                        <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                    <div className="card-footer">
                        <small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small>
                    </div>
                </div>
            </div>
        )
}

export default NewsItem
