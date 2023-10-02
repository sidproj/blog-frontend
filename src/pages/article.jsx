import styled from "styled-components";
import backIcon from "../assets/Arrow 1.svg";
import CommentSection from "../components/commentSection";
import { useRecoilState } from "recoil";
import { ArticleAtom } from "../recoil/articles";
import config from "../config.json";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
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

const Title = styled.div`
    font-size:1.3rem;
    font-weight:500;
`

const MainImg = styled.div`
    padding:0.6rem;
    background-color:#333;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
`

const Description = styled.div`
    font-size:1rem;
`

const PostDate = styled.div`
    color:#bdbdbd;
    margin-top:-1rem;
`

const Img = styled.img`
    width:100%;
    object-fit:contain;
`

const Article = () =>{

    const navigate = useNavigate();
    const location = useLocation();
    const {article_id} = location.state;

    const [user,setUser] = useRecoilState(UserAtom);
    const [articleData,setArticleData] = useRecoilState(ArticleAtom);
    const [article,setArticle] = useState(null);

    const findInRecoilState = ()=>{
        for(let i=0;i<articleData.length;i++){
            if(articleData[i].id == article_id){
                return articleData[i];
            }
        }
        return false;
    }
    const getArticle = async()=>{
        const recoilData = findInRecoilState();
        // if(recoilData) {
        //     setArticle(recoilData);
        //     return;
        // }
        const url = config.SERVER_URL+"/article/"+article_id;
        try{
            const response = await fetch(url);
            const data = await response.json();
            setArticle(data);
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
            body: JSON.stringify({jwt:jwt,topic_id:article?.topic?._id}),
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
        getArticle();
    },[]);

    return(
        <>
            <ControlBar>
                <img src={backIcon} onClick={()=>navigate(-1)}/>
                <Accent1>{article?.topic?.name} 
                {
                    !user || !user?.subsribed?.includes(article?.topic?._id) ?
                    <FollowBtn onClick={()=>updateTopicFollow(true)}>Follow</FollowBtn>:
                    <UnfollowBtn onClick={()=>updateTopicFollow(false)}>Unfollow</UnfollowBtn>
    
                }</Accent1> 
            </ControlBar>
            <Title>{article?.name}</Title>
            
            {
                Array.isArray(article?.sections) &&
                article?.sections.map((section,index)=>{
                    return(
                        <>
                            <MainImg key={index}><Img src={section.img}/></MainImg>
                            <Description key={index+"desc"}>
                                {
                                    section.text
                                }
                            </Description>
                        </>
                    )
                })
            }

            <PostDate>Posted on : { (new Date(article?.date)).toLocaleDateString() }</PostDate>
            <CommentSection 
                comments = {article?.comments} 
                article_id={article_id} 
                getArticle={getArticle}
            />
        </>
    );
}

export default Article;