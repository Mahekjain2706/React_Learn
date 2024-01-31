import React,{useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

// React Life Cycle Diagram
const News = (props) => {
    // Math.ceil give you approx items ex: 4.6 -> 5 etc
    
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0);

    const capitalize = (string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    // In this first render function work then cdm
    // async function wait for resolve promises/ fetching api. 

    const updateNews = async() => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        console.log(url);
        // setState({loading: true});
        setLoading(true)
         let data =await fetch(url);
         props.setProgress(30);
         let parsedData = await data.json()
         console.log(parsedData);
         props.setProgress(70);
         setArticles(parsedData.articles)
         setTotalResults(parsedData.totalResults)
         setLoading(false)
         props.setProgress(100);
    }

    useEffect(() => {
        document.title = `NewsMonkey-${capitalize(props.category)}`;
        updateNews();
        // eslint-disable-next-line
    }, [])


// const preClick = async ()=>{
//     setPage(page - 1);   
//     updateNews(); 
//     }

// const nextClick = async ()=>{
//         setPage(page + 1);
//         updateNews();
//     }

const fetchMoreData = async () => {
    
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page + 1);
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
      };

        // console.log("render");
        return (
        <>
            {/*<div className="container my-3">*/}
            
                <h1 className="text-center" style={{ margin: '35px 0px', marginTop:'90px' }}>NewsMoney - Top Headlines from {capitalize(props.category)}</h1>
                {loading && <Spinner/>}
                
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length!== totalResults}
                    loader={<Spinner/>}
                >
                <div className="container">
                <div className="row ">
                     {/* !loading && */} {articles.map((element)=>{
                      return <div className="col md-4  my-2" key={element.url} >
                        <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,90):""} imageUrl={element.urlToImage} newsUrl={element.url}  author={element.author} date={element.publishedAt} source={element.source.name} Ccolor={props.Ccolor}/>
                    </div>  
                    })}
                </div></div>
                </InfiniteScroll>
                
                {/* <div className="container d-flex justify-content-between">
                <button type="button" className="btn btn-dark" disabled={page<=1} onClick={preClick}> &larr; Previous</button>
                <button type="button" className="btn btn-dark" disabled={page + 1 > Math.ceil(totalResults/props.pageSize)} onClick={nextClick}>Next &rarr; </button>
                </div> */}
            {/*</div>*/}
            </>
        )
}

News.defaultProps = {
    country: 'in',
    pageSize: '10',
    category: 'general',
    Ccolor: 'primary'
}
News.propTypes = {
      country: PropTypes.string,
      pageSize: PropTypes.number,
      category: PropTypes.string,
      Ccolor: PropTypes.string,
}

export default News
