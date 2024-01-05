/*
용도: 대여글 리스트 페이지
담당자: 김서영
사용법: 장소에 올라와있는 물품 대여 리스트를 볼수 있습니다
기타: 뀽
*/

import Header from "../layout/Header";
import styled from "styled-components";
import MenuBar from "../layout/MenuBar";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

//전체 배경
const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  max-width: 700px;
  background: #ffffff;
`;

//박스 양옆 여백
const PostBox = styled.div`
  padding: 20px;
`;

//list 박스
const BoardBox = styled.div`
  //border-radius: 20px;
  //border: 1px solid #eaeaea;
  background: #fff;
  padding: 5px 0px;
  & a:last-child div {
    border-bottom: none;
  }
`;

//list 박스 사이 구분선
const Listbox = styled.div`
  border-bottom: 1px solid #eaeaea;
  margin: 0px;
  padding: 10px 10px 10px;
`;

//게시물 이미지
const MainImage = styled.div`
  //border-bottom: 1px solid #eaeaea;
  margin: 15px;
  width: 50px;
  height: 50px;
  background: skyblue;
  float: left;
  border-radius: 10px;
`;

//게시물 제목
const NoticeTitle = styled.div`
color: #1F1F1F;
font-size: 15px;
font-weight: 500;
margin-bottom :10px;
`;

//게시물 상세설명(건물 위치등)
const PostDetail = styled.div`
color: #606060;
font-size: 10px;
font-weight: 400;
margin-bottom :5px;
`;

//게시물 가격
const PostPrice = styled.div`
color: #000;
font-size: 13px;
font-weight: 400;
`;

//게시물 옆에 채팅? 댓글 아이콘
const ImageIcon = styled.img`
  width: 17px;
  height: 17px;
  float: right;
  vertical-align: middle;
  margin-left: auto;
`;

const Post = () => {
  const [post, setPost] = useState([
    {
      id: 1,
      title: "과학사의 이해",
      detail: "비전타워 5층 502호 | 7분전",
      price: "2000원"
    },
    {
      id: 2,
      title: "과학사의 이해",
      detail: "비전타워 5층 502호 | 7분전",
      price: "2000원"
    },
    {
      id: 3,
      title: "과학사의 이해",
      detail: "비전타워 5층 502호 | 7분전",
      price: "2000원"
    },
    {
      id: 4,
      title: "과학사의 이해",
      detail: "비전타워 5층 502호 | 7분전",
      price: "2000원"
    },
    {
      id: 5,
      title: "과학사의 이해",
      detail: "비전타워 5층 502호 | 7분전",
      price: "2000원"
    },
    {
      id: 6,
      title: "과학사의 이해",
      detail: "비전타워 5층 502호 | 7분전",
      price: "2000원"
    }
  ]);

  return (
    <Container>
      <Header headerType={"admin"} headerText={"비전타워"}>         
      </Header>
      <PostBox>
        <BoardBox>
          {post.map((post, index) => (
            <Link to={"/post/"+index} key={index}>
              <MainImage></MainImage>
              <Listbox>
                <NoticeTitle>{post.title}</NoticeTitle>
                <PostDetail>{post.detail}</PostDetail>
                <PostPrice>{post.price}
                <ImageIcon src={"/image/chatt.svg"} alt="" />
         
                </PostPrice>
              </Listbox>
            </Link>
          ))}
        </BoardBox>
      </PostBox>
      <MenuBar></MenuBar>
    </Container>
  );
};

export default Post;


