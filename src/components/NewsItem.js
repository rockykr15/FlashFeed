import React, { Component } from 'react'

export class NewsItem extends Component {
  
  render() {
   let {title,descriprion,imageUrl,newsUrl}= this.props;
    return (
      <div>
       <div className="card" style={{width: "18rem"}}>
       <img src={!imageUrl?"https://static.toiimg.com/thumb/msid-107784204,width-1070,height-580,imgsize-777913,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg":imageUrl} className="card-img-top" alt="..."/>
      <div className="card-body">
      <h5 className="card-title">{title}...</h5>
      <p className="card-text">{descriprion}</p>
       <a href={newsUrl} target="_blank"  rel="noreferrer" className="btn btn-sn btn-primary">Read More</a>
    </div>
     </div>
    </div>
    )
  }
}

export default NewsItem
