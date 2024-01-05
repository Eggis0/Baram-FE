/*
용도: 대여글 내부 페이지
담당자: 김서영
사용법: 
기타: 
*/


import Header from "../layout/Header";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MenuBar from "../layout/MenuBar";
import { useParams } from "react-router-dom";

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
  padding: 50px;
`;

//list 박스
const BoardBox = styled.div`
  background: #fff;
  & a:last-child div {
    border-bottom: none;
  }
`;

//게시물 제목
const Title = styled.div`
color: #5F5F5F;
font-size: 23px;
font-weight: 700;
`;

//게시물 작성자
const User = styled.div`
margin: 15px 0px 0px;
color: #676767;
font-size: 15px;
font-weight: 700;
`;

//게시물 작성자이미지
const UserImage = styled.div`
  margin: 0px 5px 0px 0px;
  width: 17px;
  height: 17px;
  background: lightcoral;
  float: left;
  border-radius: 100px;
`;

//게시물 날짜
const Date = styled.div`
  margin: -15px 0px 0px;
  color: #676767;
  text-align: right;
  font-size: 10px;
  font-weight: 400;
`;

//게시물 내용디테일
const Detail = styled.div`
width: 100%;
color: #676767;
font-size: 15px;
font-weight: 400;
`;

//게시물 이미지
const Image = styled.div`
  margin: 10px 0px;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: skyblue;
  border-radius: 10px;
`;

//위치 가격 보증품 
const ListName = styled.div`
  color: #676767;
  font-size: 15px;
  font-weight: 700;
  float: left;
  margin: 0px 10px 0px 0px;
`;
//위치 가격 보증품 디테일
  const ListNameDetail = styled.div`
  color: #676767;
  font-size: 15px;
  font-weight: 400;
  margin: 0px 0px 5px 0px;
`;

//빌린날 BOX
const BOX = styled.div`
  border: 2px solid #eaeaea;
  margin: 0px 0px 0px 0px;
  padding: 15px 15px 20px 15px;
  border-radius: 30px;
`;

//필요한날 타이틀
const Lend = styled.div`
  color: #676767;
  font-size: 15px;
  font-weight: 700;
  /* margin: 0px 10px 0px 0px; */
`;
//필요한날짜
  const LendDetail = styled.div`
  color: #676767;
  font-size: 15px;
  font-weight: 400;
  margin: 0px 0px 5px 0px;
`;

//반납날짜 타이틀
const Get = styled.div`
  color: #676767;
  font-size: 15px;
  font-weight: 700;
  float: right;
`;
//반납 날짜 
  const GetDetail = styled.div`
  color: #676767;
  font-size: 15px;
  font-weight: 400;
  float: right;
`;

//날짜 몇일? 
const LendDate = styled.div`
color: #676767;
font-size: 15px;
font-weight: 500;
margin: 0px 0px 0px 48%;
`;

//대화하기
const ChatBox = styled.div`
  margin: 20px 0px 100px 0px;
  padding: 10px 10px 10px 10px;
  border-radius: 8px;
  background: #379DFF;
  color: var(--White, #FFF);
text-align: center;
font-size: 20px;
font-weight: 600;

`;

 const PostDetail = () => {

  const { id } = useParams();


   return (
    <Container>
      <Header headerType={"admin"} headerText={"대학빌림"}></Header>
      <PostBox>
        <BoardBox>
          <Title>과학사의이해</Title>
          <User><UserImage></UserImage>연희동최춘식</User>
          <Date>2022.07.08</Date>
          <br></br>
          <Detail>제가요과학책이 필요해서요 지금 당장 안빌려주시면 교수님이 화를 내실꺼고 제이름을 알아가실꺼고, 그러면 제가 F를 맞게 될것이고 F를 맞으면 이번학기에 학점이 0점이 나올수도 잇고, 학점이 0점이 나오면 학사경고를 받을수 있고, 학사경고를 맞으면 가천대를 떠나야 할것같습니다.그러므로 제발 책 빌려주세요 ㅠㅜㅠㅜㅠㅜㅠㅜ</Detail>
          <Image></Image>
          <ListName>위치</ListName>
          <ListNameDetail>비전타워 4층 406호</ListNameDetail>
          <ListName>대여금</ListName>
          <ListNameDetail>2000$</ListNameDetail>
          <ListName>보증품</ListName>
          <ListNameDetail>신분증</ListNameDetail>
          <br></br>
          <BOX>
          <Lend>필요한날<Get>반납날짜</Get></Lend>
          <LendDate>9일</LendDate>
          <LendDetail>2023.4.10
            <GetDetail>2023.7.8</GetDetail>
          </LendDetail>
          </BOX>
          <ChatBox>대화하기</ChatBox>
        </BoardBox>

      </PostBox>
      <MenuBar></MenuBar>
    </Container>
   );

 };

 export default PostDetail;
