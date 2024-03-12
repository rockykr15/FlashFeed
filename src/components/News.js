import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner1 from './Spinner1';
export class News extends Component {
 
  constructor(){
    super();
    console.log("Hello I am a constructor from news components");
    this.state={
     articles: [],
     loading:false,
     page:1
    }
  }



  //api fetch through url api key
async componentDidMount(){
    let url=`https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=d80b7e9b9f8d46d0ac724e93173403fd&page=1&pageSize=${this.props.pageSize}`;
    let data=await fetch(url);
    let parsedData=await data.json()
    console.log(parsedData);
    this.setState({articles: parsedData.articles,totalResultss:parsedData.totalResults})
}

 handlePrevClick =async () =>{
   console.log("previos")
   let url=`https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=d80b7e9b9f8d46d0ac724e93173403fd&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
   let data=await fetch(url);
   let parsedData=await data.json()
   console.log(parsedData);
   this.setState({
    page:this.state.page - 1,
    articles: parsedData.articles
   })
}

//  handleNextClick =async () =>{
//    console.log("Next");
//    if(this.state.page + 1 > Math.ceil(this.state.totalResults/20)){

//    }
//    else{
//    let url=`https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=d80b7e9b9f8d46d0ac724e93173403fd&page=${this.state.page + 1}&pageSize=20`;
//    let data=await fetch(url);
//    let parsedData=await data.json()
//    console.log(parsedData);
//    this.setState({
//     page:this.state.page +1,
//     articles: parsedData.articles
//    })
// } 
// }

handleNextClick = async () => {
  console.log("Next");
  const nextPage = this.state.page + 1;
  const totalPages = Math.ceil(this.state.totalResults / this.props.pageSize);

  if (nextPage > totalPages) {
    console.log("No more pages to fetch.");
    return;
  }

  let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=d80b7e9b9f8d46d0ac724e93173403fd&page=${nextPage}&pageSize=${this.props.pageSize}`;
  let data = await fetch(url);
 let parsedData = await data.json();
  console.log(parsedData);

  this.setState({
    page: nextPage,
    articles: parsedData.articles,
    totalResults: parsedData.totalResults
  });
};

  render() {
    return (
        <div className="container my-3">
        <h1 className="text-center">FlashFeed -Top Headline</h1>
       
          {this.state.loading && <Spinner1/>}
          <div className='row'>
          {this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>  
             {/* //title.slice(0,45), descriprion.slice(0,88) */}
          <NewsItem  title={element.title?element.title.slice():""} decription={element.description?element.description.slice():""} imageUrl={element.urlToImage} newsUrl={element.url}/>
          </div>
         })}"
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-secondary"  onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-secondary" onClick={this.handleNextClick}>&rarr; Next</button>
        </div>
        </div>
    )
  }
}

export default News
