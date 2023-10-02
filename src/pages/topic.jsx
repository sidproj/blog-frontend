import styled from "styled-components";
import backIcon from "../assets/Arrow 1.svg";
import Heading from "../components/heading";
import ThumbnailArticle from "../components/thumbnailArticle";
import { useLocation, useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { ArticleAtom } from "../recoil/articles";
import { useEffect, useState } from "react";

import config from "../config.json";
import { UserAtom } from "../recoil/user";


const ControlBar = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
`
const Accent1 = styled.div`
    color:#91b602;
    font-size:1.25rem;
    font-weight:600;
    display:flex;
    flex-direction:row;
    column-gap:0.5rem;
    align-items:baseline;
`

const FollowBtn = styled.div`
    padding:0.25rem 1rem;
    color:#91b602;
    font-size:1.1rem;
    font-weight:400;
    border:solid 0.1rem #91b602;
    width:fit-content;
    border-radius: 0.25rem;
`

const UnfollowBtn = styled.div`
    padding:0.25rem 1rem;
    color:#BDBDBD;
    font-size:1rem;
    font-weight:400;
    border:solid 0.1rem #BDBDBD;
    width:fit-content;
    border-radius: 0.25rem;
`

const Error = styled.div`
    color:#91b602;
    width:100%;
    text-align:center;
    font-size:2rem;
    margin-top:7rem;
`

const Topic = (props) => {

    const [user,setUser] = useRecoilState(UserAtom);

    const navigate = useNavigate();
    const location = useLocation();
    const {topic_id,name} = location.state;

    const [articleData,setArticleData] = useRecoilState(ArticleAtom);
    const [articles,setArticles] = useState(null);

    const findInRecoilState = ()=>{
        const articlesInRecoil = [];
        for(let i=0;i<articleData.length;i++){
            if(articleData[i].topic._id == topic_id){
                articlesInRecoil.push(articleData[i]);
            }
        }
        return articlesInRecoil;
    }

    const getArticleByTopic = async()=>{
        const articlesInRecoil = findInRecoilState();
        if(articlesInRecoil.length > 0) {
            setArticles(articlesInRecoil);
            return;
        }
        const url = config.SERVER_URL+"/article/topic/id/"+topic_id;
        try{
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setArticleData((oldArticleData)=>{
                return [ 
                 ...oldArticleData,
                 ...data
                ]
             });
            setArticles(data);
        }catch(e){
            console.log(e);
        }
    }

    const updateTopicFollow = async (do_follow)=>{
        const jwt = localStorage.getItem("jwt");
        if(!jwt) navigate("/login");

        let url = config.SERVER_URL;
        if (!do_follow) url+="/user/subscribe/remove";
        else url += "/user/subscribe/add";

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({jwt:jwt,topic_id:topic_id}),
        }
        try{
            const response = await fetch(url,options);
            const data = await response.json();
            setUser(data.user);
        }catch(e){
            console.log(e);
        }
    }

    useEffect(()=>{
        getArticleByTopic();
    },[]);

    return (
        <>
            <ControlBar>
                <img src={backIcon} onClick={()=>navigate(-1)}/>
                <Accent1>{name} 
                {
                    !user || !user?.subsribed?.includes(topic_id) ?
                    <FollowBtn onClick={()=>updateTopicFollow(true)}>Follow</FollowBtn>:
                    <UnfollowBtn onClick={()=>updateTopicFollow(false)}>Unfollow</UnfollowBtn>

                }</Accent1>
            </ControlBar>
            <Heading title={"LASTEST ON "+name}/>

            {
                (Array.isArray(articles) && (articles.length > 0) )?
                articles.map((article,index)=>{
                    return(
                        <ThumbnailArticle 
                            key={index}
                            text={article?.sections[0]?.text}
                            img={article?.sections[0]?.img}
                            name={article?.name}
                            id={article?._id}
                        />
                    )
                }):
                <Error>No Articles Found!</Error>
            }

        </>
    );
}

export default Topic;