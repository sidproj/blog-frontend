import styled from "styled-components";
import Heading from "../components/heading";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { UserAtom } from "../recoil/user";
import config from "../config.json";

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

const Description = styled.div`
    font-size:1rem;
    margin-top:-1rem;
`

const SingleTopic = (props)=>{

    const [user,setUser] = useRecoilState(UserAtom);
    const navigate = useNavigate();

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
            body: JSON.stringify({jwt:jwt,topic_id:props.id}),
        }
        try{
            const response = await fetch(url,options);
            const data = await response.json();
            setUser(data.user);
        }catch(e){
            console.log(e);
        }
    }

    return (
        <>
            <SubheadRow>
                <Heading title={props.name}/>
                {
                    !user || !user?.subsribed?.includes(props.id) ?
                    <FollowBtn onClick={()=>updateTopicFollow(true)}>Follow</FollowBtn>:
                    <UnfollowBtn onClick={()=>updateTopicFollow(false)}>Unfollow</UnfollowBtn>
    
                }
            </SubheadRow>
            <Description>
                {props.description}
            </Description>
            <Link to="/topic" state={{topic_id:props.id,name:props.name}}>
                <ViewBtn>View Articles</ViewBtn>
            </Link>
        </>
    )
}

export default SingleTopic;