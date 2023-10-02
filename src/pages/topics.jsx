import styled from "styled-components";
import backIcon from "../assets/Arrow 1.svg";
import SingleTopic from "../components/singleTopic";
import config from "../config.json";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { TopicAtom } from "../recoil/topics";
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

const Description = styled.div`
    font-size:1rem;
    margin-top:-1rem;
`

const SubheadRow = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
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
    font-size:1.1rem;
    font-weight:400;
    border:solid 0.1rem #BDBDBD;
    width:fit-content;
    border-radius: 0.25rem;
`

const ViewBtn = styled.div`
    padding:0.5rem 1.5rem;
    color:#313131;
    font-size:1.25rem;
    font-weight:600;
    background-color:#91b602;
    width:fit-content;
    border-radius: 0.25rem;
    margin-top:-1rem;
`

const Topics = (props) => {

    const navigate = useNavigate();    
    const [topicData,setTopicData] = useRecoilState(TopicAtom);

    // function to fetch all topics
    const getTopics = async()=>{
        if(topicData.length != 0)return;
        try{
            const url = config.SERVER_URL+"/topic/topics";
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
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
                <Accent1>Topics</Accent1>
            </ControlBar>
            
            {
                Array.isArray(topicData) &&
                topicData.map((topic,index)=>{
                    return(
                        <SingleTopic
                            key={index}
                            name={topic?.name}
                            description={topic?.description}
                            id={topic?._id}
                        />
                    )
                })
            }         
        </>
    )
}

export default Topics;