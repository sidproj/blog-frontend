import styled from "styled-components";
import Heading from "../components/heading";
import TopicBtn from "../components/topicBtn";
import ThumbnailArticle from "../components/thumbnailArticle";
import { useEffect } from "react";
import { TopicAtom } from "../recoil/topics";
import config from "../config.json";
import { useRecoilState } from "recoil";
import { ArticleAtom } from "../recoil/articles";
import { Link } from "react-router-dom";

const TopicsContainer = styled.div`
    overflow-x:scroll;
    display:flex;
    flex-direction:row;
    align-items:center;
    column-gap:1rem;

    /* hiding scrollbar */
    &&::-webkit-scrollbar{
        display:none;
    }
    -ms-overflow-style:none;
    scrollbar-width:none;
`

const Home = (props)=>{

    const [topicData,setTopicData] = useRecoilState(TopicAtom);
    const [articleData,setArticleData] = useRecoilState(ArticleAtom);

    // function to fetch all topics
    const getTopics = async()=>{
        if(topicData.length != 0)return;
        try{
            const url = config.SERVER_URL+"/topic/topics";
            const response = await fetch(url);
            const data = await response.json();
            setTopicData(data);
        }catch(e){
            console.log(e);
        }
    }

    // function to fetch latest articles
    const getLatestArticles = async ()=>{
        if(articleData.length !=0)return;
        try{
            const url = config.SERVER_URL+"/article/latest";
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setArticleData(data);
        }catch(e){
            console.log(e);
        }
    }

    useEffect(()=>{
        getLatestArticles();
        getTopics();
    },[]);
    return(
        <>
            <Heading title="TOPICS" />
            
            {/* topics list */}
            <TopicsContainer>
                
                <TopicBtn key={0} topic={"ALL"}/>
                {
                    Array.isArray(topicData) &&
                    topicData.map((topic,index)=>{
                        return(
                            <Link to="/topic" state={{topic_id:topic._id,name:topic.name}}>
                                <TopicBtn key={index} topic={topic.name}/>
                            </Link>
                        )
                    })
                }
            </TopicsContainer>

            {/* latest articles */}
            <Heading title="LATEST ARTICLES" />
            {
                Array.isArray(articleData) && 
                articleData.map((article,index)=>{
                    return(
                        <ThumbnailArticle key={index}
                            img={article?.sections[0]?.img} 
                            text={article?.sections[0]?.text}
                            name={article?.name}
                            id={article?._id}
                        />
                    )
                })  
            }
        </>
    );
}

export default Home;