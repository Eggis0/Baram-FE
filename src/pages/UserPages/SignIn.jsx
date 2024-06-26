import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";
import Footer from "../../components/layout/Footer";

const LoginBox = styled.div`
    margin: 20px auto;
    padding: 70px 0px;
    width: 90%;
    background : none;
    border-radius: 20px;
`;

const Title = styled.div`
    text-align: center;
    height: 45px;
    line-height: 45px;
    margin-bottom: 150px;
    font-size: 60px;
    font-weight: 850;
    
    & a{
      font-family: 'Noto Sans KR'; 
      color : #379DFF;
    }
`;

const SubTitle = styled.div`
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    color : #adb5c2;
`;

const ForgotPassword = styled.span`
    margin-top: -15px;
    display: block;
    text-align: center;
    color : #379DFF;
`;

const GoToSignUp = styled.span`
    margin-top: 10px;
    display: block;
    text-align: center;
    color : #aaaaaa;
`;

const InputBox = styled.input`
    display: block;
    margin: 10px auto;
    height: 40px;
    background: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 10px;
    color:#333333;
    font-size: 18px; 
    outline: none;
    padding: 0px 3%;
    width: 60%;
    &::placeholder {
        color: #aaaaaa; 
        font-size: 18px;
    }
    &:focus {
      border-color: #379DFF;
    }
`;

const SubmitBtn = styled.button`
    display: block;
    margin: 30px auto;
    height: 40px;
    background: #efefef;
    border: none;
    border-radius: 10px;
    background: #379DFF;
    font-weight: bold;
    color:#ffffff;
    font-size: 18px; 
    outline: none;
    width: 66%;
    &::placeholder {
        color: #aaaaaa; 
        font-size: 18px;
    }
`;

const SignIn = () => {
  const navigate = useNavigate(); 
  const [, setCookie] = useCookies(); 
  const useridRef = useRef();
  const passwordRef = useRef();
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();

    // 입력을 아에 안했는지 확인
    if (userid.length < 1) {
      window.alert("아이디를 입력해주세요.");
      useridRef.current.focus();
      setUserid('');
      return;
    }
    if (password.length < 1) {
      window.alert("패스워드를 입력해주세요.");
      passwordRef.current.focus();
      setPassword('');
      return;
    }

    try {
      const loginResponse = await axios.post(process.env.REACT_APP_BACK_URL+"/login",
        {
          userid,
          password
        }
      );
      if (loginResponse.status === 200) {
        // 2시간 후 만료되는 쿠키 생성
        const expires = moment().add(48, "hours").toDate();
        setCookie("token", loginResponse.data.token, {
          path: "/",
          expires: expires,
        });
        setCookie("userId", loginResponse.data.userId, {
          path: "/",
          expires: expires,
        });
        setCookie("nickname", loginResponse.data.nickname, {
          path: "/",
          expires: expires,
        });
        setCookie("roles", loginResponse.data.roles, {
          path: "/",
          expires: expires,
        });
        setCookie("certification", loginResponse.data.certification, {
          path: "/",
          expires: expires,
        });
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) { // 아이디가 틀리다면
        window.alert("아이디를 다시 확인해주세요.");
      } else if (error.response && error.response.status === 401) { // 비밀번호가 틀리다면
        window.alert("비밀번호가 올바르지 않습니다.");
      } else {
        console.error("오류 발생:", error);
      }
    }
  };
  const activeEnter = (event) => {
    if (event.code === 'Enter') {
      handleLogin(event);
    }
  };

  return (
    <div>
      <LoginBox>
        {/* 타이틀 */}
        <Title>
          <SubTitle>
            당장 필요할때 바로 빌리자
          </SubTitle>
          <Link to={"/"}>Baram</Link>
        </Title>

        {/* 아이디 */}
        <InputBox
          type="text"
          ref={useridRef}
          name="id"
          value={userid}
          placeholder="아이디"
          onChange={(e) => {
            setUserid(e.target.value);
          }}
          onKeyDown={(e) => { activeEnter(e) }}
        />

        {/* 비밀번호 */}
        <InputBox
          type="password"
          ref={passwordRef}
          name="password"
          value={password}
          placeholder="비밀번호"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          onKeyDown={(e) => { activeEnter(e) }} />

        {/* 제출 버튼 */}
        <SubmitBtn onClick={handleLogin}>로그인</SubmitBtn>
        <ForgotPassword>비밀 번호를 잊으셨나요?</ForgotPassword>
        <Link to={"/signup"}>
          <GoToSignUp>회원가입 하러가기</GoToSignUp>
        </Link>
      </LoginBox>
      <Footer></Footer>
    </div>
  );
};

export default SignIn;