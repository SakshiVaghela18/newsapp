import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'



export class News extends Component {
  static defaultProps={
    country: 'in',
    pageSize: 8,
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  constructor(){
    super();
    console.log("Hello I m sakshi from news component");
    this.state={
      articles: [],
      loading: false,
      page:1
    }
   }

   async upadateNews(){
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=10e838092e914ef48fe47ec3735fa10b&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data=await fetch(url);
    let parsedData= await data.json()
    console.log(parsedData);
    this.setState({articles: parsedData.articles,totalArticles:parsedData.totalResults})
   }

   async componentDidMount(){
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=10e838092e914ef48fe47ec3735fa10b&page=1&pageSize=${this.props.pageSize}`;
    // let data=await fetch(url);
    // let parsedData= await data.json()
    // console.log(parsedData);
    // this.setState({articles: parsedData.articles,totalArticles:parsedData.totalResults})
    this.upadateNews();
   }

   handlePrevClick = async()=>{
    //     let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=10e838092e914ef48fe47ec3735fa10b&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    //     let data=await fetch(url);
    //     let parsedData= await data.json()
    //     console.log(parsedData);
    //     this.setState({
    //         page:this.state.page - 1,
    //         articles: parsedData.articles
    // })
      this.setState({page: this.state.page - 1});
      this.upadateNews();
   }

   handleNextClick = async()=>{
    // if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

    // }
    // else{
    //     let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=10e838092e914ef48fe47ec3735fa10b&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //     let data=await fetch(url);
    //     let parsedData= await data.json()
    //     console.log(parsedData);
    //     this.setState({
    //         page:this.state.page + 1,
    //         articles: parsedData.articles
    //     })
    // }
    this.setState({page: this.state.page + 1});
    this.upadateNews();
   }
  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin: '35px 0px'}}>NewsBox - Top Headlines</h1>
        
        <div className="row">
        {this.state.articles.map((element)=>{
          return <div className="col-md-4" key={element.url}>
            <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
          </div>

        })}
            
        </div>
        <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark"onClick={this.handleNextClick}>Next &rarr;</button>

        </div>
      </div>
    )
  }
}

export default News;
