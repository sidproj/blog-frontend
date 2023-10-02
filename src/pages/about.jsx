import styled from "styled-components";
import backIcon from "../assets/Arrow 1.svg";
import { useEffect } from "react";
import config from "../config.json";
import { TopicAtom } from "../recoil/topics";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router";

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
`

const Title = styled.div`
    font-size:1.5rem;
    font-weight:600;
`

const Description = styled.div`
    font-size:1rem;
    margin-top:-1rem;
`

const GreenSpan = styled.span`
    color:#91b602;
`

const About = ()=>{

    const [topicData,setTopicData] = useRecoilState(TopicAtom);
    const navigate = useNavigate();

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

    useEffect(()=>{
        getTopics();
    },[]);

    return (
        <>
            <ControlBar>
                <img src={backIcon} onClick={()=>navigate(-1)}/>
                <Accent1>About</Accent1>
            </ControlBar>
            <Title>About Nerd's Notebook</Title>
            <Description>
                Welcome to <GreenSpan>Nerd's Notebook</GreenSpan>, the unfiltered chaos where we boldly 
                explore the world of tech, anime, music, movies, philosophy, and 
                maybe some stuff that's just downright mediocre.
            </Description>

            
            <Title>What we offer</Title>
            {
                Array.isArray(topicData) && topicData.map((topic,index)=>{
                    return(
                        <Description key={index}>
                        <GreenSpan>{topic.name}: </GreenSpan>
                        {topic.description}
                    </Description>
                    )
                })
            }
            <Description>
            <GreenSpan>Thanks for daring to embark on this whirlwind adventure. 
            At </GreenSpan>Nerd's Notebook<GreenSpan>, we know that not every post will be a masterpiece, 
            but we promise to keep it real, uncensored, and possibly wonderfully mediocre. 
            Let's embrace the chaos together!</GreenSpan>
            </Description>
            
        </>
    )
}

export default About;