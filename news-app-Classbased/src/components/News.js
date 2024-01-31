import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

// React Life Cycle Diagram
export class News extends Component {
    // Math.ceil give you approx items ex: 4.6 -> 5 etc
    static defaultProps = {
      country: 'in',
      pageSize: '10',
      category: 'general',
      Ccolor: 'primary'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
        Ccolor: PropTypes.string,
      }
    
      capitalize = (string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    constructor(props) {
        super(props);
        // console.log('Hello i am a coonstructor!')
        this.state = {
            articles: [],
            loading: true,
            page:1,
            totalResults: 0,
        }
        document.title = `NewsMonkey-${this.capitalize(this.props.category)}`;
    }
    // In this first render function work then cdm
    // async function wait for resolve promises/ fetching api. 

    async updateNews(pageNo){
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
         this.setState({loading: true});
         let data =await fetch(url);
         this.props.setProgress(30);
         let parsedData = await data.json()
        //  console.log(parsedData);
         this.props.setProgress(70);
         this.setState({articles : parsedData.articles, totalResults: parsedData.totalResults,loading:false})
         this.props.setProgress(100);
    }

    async componentDidMount(){
        //  console.log("cdm");
        //  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${apiKey}&page=1&pageSize=${this.props.pageSize}`;
        //  this.setState({loading: true});
        //  let data =await fetch(url);
        //  let parsedData = await data.json()
        //  console.log(parsedData);
        //  this.setState({articles : parsedData.articles, totalResults: parsedData.totalResults,loading:false})
        this.updateNews();
    }

    preClick = async ()=>{
        // console.log("Previous")
        // let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=${apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading: true});
        // let data =await fetch(url);
        // let parsedData = await data.json()
        // this.setState({
        //     page: this.state.page - 1,
        //     articles : parsedData.articles,
        //     loading: false
        // })
        this.setState({page: this.state.page - 1});
        
    }

    nextClick = async ()=>{
        // console.log("Next");
        // let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=30e5f29bf3e445fd89c158288e6b28f2&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading: true});
        //  let data =await fetch(url);
        //  let parsedData = await data.json()
        // this.setState({
        //     page: this.state.page + 1,
        //     articles : parsedData.articles,
        //     loading: false
        // })
        this.setState({page: this.state.page + 1});
        this.updateNews();
    }

    fetchMoreData = async () => {
        this.setState({
            page: this.state.page + 1,
        }) 
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({articles : this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults})
      };

    render() {
        // console.log("render");
        return (<>
            {/*<div className="container my-3">*/}
            
                <h1 className="text-center" style={{margin: '35px 0px', marginTop:'90px'}}>NewsMoney - Top Headlines from {this.capitalize(this.props.category)}</h1>
                {this.state.loading && <Spinner/>}
                
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length!== this.state.totalResults}
                    loader={<Spinner/>}
                >
                <div className="container">
                <div className="row ">
                     {/* !this.state.loading && */} {this.state.articles.map((element)=>{
                      return <div className="col md-4  my-2" key={element.url} >
                        <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,90):""} imageUrl={element.urlToImage} newsUrl={element.url}  author={element.author} date={element.publishedAt} source={element.source.name} Ccolor={this.props.Ccolor}/>
                    </div>  
                    })}
                </div></div>
                </InfiniteScroll>
                
                {/* <div className="container d-flex justify-content-between">
                <button type="button" className="btn btn-dark" disabled={this.state.page<=1} onClick={this.preClick}> &larr; Previous</button>
                <button type="button" className="btn btn-dark" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} onClick={this.nextClick}>Next &rarr; </button>
                </div> */}
            {/*</div>*/}
            </>
        )
    }
}

export default News
