import styled from "styled-components";
import Comment from "./comment";
import { useRecoilState } from "recoil";
import { UserAtom } from "../recoil/user";
import config from "../config.json";
import { useNavigate } from "react-router";
import { useState } from "react";

const Container = styled.div`
    display:flex;
    flex-direction:column;
    row-gap:1rem;
`

const Title = styled.div`
    font-size:1.3rem;
    font-weight:500;
`

const TextArea = styled.textarea`
    outline:none;
    border:none;
    padding:0.75rem;
    height:7rem;
    resize:none;
    font-size:1rem;
    border-radius:0.30rem;
    font-family: Lato;
    font-size: 1rem;
    font-weight: 600;
    background-color:#313131;
    color:#bdbdbd;
    &&::placeholder{
        color:#bdbdbd;
    }
`

const ViewBtn = styled.div`
    padding:0.40rem 1.2rem;
    color:#313131;
    font-size:1.25rem;
    font-weight:600;
    background-color:#91b602;
    width:fit-content;
    border-radius: 0.25rem;
`

const CommentSection = (props) => {

    const [user,setUser] = useRecoilState(UserAtom);
    const navigate = useNavigate();

    const [comment,setComment] = useState("");

    const handleComment = async ()=>{
        const jwt = localStorage.getItem("jwt");
        if(!jwt) navigate("/login");

        const url = config.SERVER_URL+"/article/comment/add";
        const options = {
            method:"POST",
            headers:{
                "Content-Type":"Application/json",
            },
            body:JSON.stringify({jwt:jwt,article_id:props.article_id,comment:comment})
        }

        try{
            const response = await fetch(url,options);
            const data = await response.json();
            console.log(data);
            props.getArticle();
            setComment("");
        }catch(e){
            console.log(e);
        }
    }

    return (
        <Container>
            <Title>Comments</Title>
            <TextArea 
                placeholder="New comment"
                value={comment}
                onChange={(e)=>setComment(e.target.value)}
            />
            <ViewBtn onClick={handleComment}>Post</ViewBtn>
            {
                Array.isArray(props.comments) && 
                props.comments.map((comment,index)=>{
                    return <Comment key={index} name={comment.name} text={comment.text}/>
                })
            }
        </Container>
    );
}

export default CommentSection;