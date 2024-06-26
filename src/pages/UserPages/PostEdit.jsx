import Header from "../../components/layout/Header";
import { useState, useEffect } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
const EditBox = styled.div`
  position: absolute;
  width: 100%;
  height: 110%;
  max-width: 700px;
  background: #ffffff;
`;

const ContentBox = styled.div`
  padding: 20px;
`;



const TextareaBox = styled.textarea`
    width: 94%;
    height: 150px;
    resize: none;
    margin: 20px 0px;
    background: #f5f5f5c5;
    border: none;
    /* border: 1px solid #f5f5f5c5; */
    border-radius: 10px;
    color:#333333;
    font-size: 17px; 
    outline: none;
    padding: 15px 3%;
    &::placeholder {
      color: #dbdbdb; 
        font-weight: 600;
        font-size: 17px;
    }
    &:focus {
      border-color: #6093FF;
    }
`;

const InputBox = styled.input`
    width: 100%;
    height: 40px;
    margin: 20px 0px;
    background: #ffffff;
    /* border: 1px solid #dddddd; */
    border: none;
    border-bottom: 2px solid #eeeeee;
    border-radius: 0px;
    color:#333333;
    font-weight: 600;
        font-size: 18px;
    outline: none;
    /* padding: 0px 3%; */
    &::placeholder {
        color: #dbdbdb; 
        font-weight: 600;
        font-size: 18px;
    }
    &:focus {
      border-color: #6093FF;
    }
`;

const HalfInputBox = styled.input`
    width: 50%;
    height: 40px;
    margin: 10px auto;
    background: #ffffff;
    border: none;
    border-bottom: 2px solid #eeeeee;
    border-radius: 0px;
    color:#333333;
    font-size: 18px; 
    float: right;
    outline: none;
    padding: 0px;
    font-weight: 600;
    &::placeholder {
      color: #dbdbdb; 
        font-weight: 600;
        font-size: 18px;
    }
    &:focus {
      border-color: #6093FF;
    }
`;

const InputContainer = styled.div`
    width: 100%;
`;
const SubmitBtn = styled.button`
    display: block;
    margin: 30px 0px;
    height: 40px;
    background: #efefef;
    border: none;
    border-radius: 10px;
    background: #6093FF;
    font-weight: bold;
    color:#ffffff;
    font-size: 18px; 
    outline: none;
    width: 100%;
`;

const DropdownWrapper = styled.div`
  margin: 10px 0px;
  width: 48%;
  position: relative;
  float: left;
  
`;

const DropdownButton = styled.button`
  /* border: 1px solid #dddddd; */
  /* border-bottom: 2px solid #eeeeee; */
  border: none;
  border-radius: 10px;
  color: #5c5c5c; 
        font-weight: 600;
        font-size: 18px;
  background-color: #f5f5f5c5;
  padding: 10px 10px;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  & div{
    display: inline-block;
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis;
  }
`;

const DropdownContent = styled.div`
height: 200px;
overflow: auto; 
    margin-top: 10px;
  display: ${props => (props.open ? 'block' : 'none')};
  border-radius: 10px;
  background-color: #ffffff;
  position: absolute;
  width: 100%;
  box-shadow: 0px 8px 16px 0px rgba(96, 96, 96, 0.2);
  z-index: 1;
  /* overflow: hidden; */
`;

const DropdownItem = styled.a`
    /* border-radius: 10px; */
  color: black;
  padding: 12px 16px;
  text-align: center;
  text-decoration: none;
  display: block;
  &:hover {
    background-color: #f5f5f5;
  }
  
`;

const DateWrapper = styled.div`
width: 100%;
float: left;
margin: 10px 0px;
  display: flex;
  flex-direction: row; /* 가로로 나오도록 수정 */
  align-items: center; /* 화면 중앙 정렬 */
  justify-content: center;
  /* gap: 4%; 간격 추가 */
  & span{
    margin: 0px 10px;
    height: 30px;
    font-size: 25px;
    color:#eeeeee;
    vertical-align: middle;
  }
`;

const DateLabel = styled.label`
  margin-bottom: 8px;
  font-weight: bold;
`;

const DateInput = styled.input`
  padding: 10px 20px;
  width: 48%;
  border:none;
  border-bottom: 2px solid #eeeeee;
  
  background:none;
  /* background-color: #f8f8f8; */
border-radius: 0px;
/* &:focus {
  } */

`;

const FileInputBtn = styled.label`
    display: block;
    /* margin: 0 auto; */
    
    & div{
      margin-top: 10px;
      display: inline-block;
      font-size: 13px;
      font-weight: 600;
      color:#ffffff;
      background: ${({ isFileSelected }) => (isFileSelected ? "#6093FF" : "#c4d6ff")};
      border-radius: 10px;
      padding: 10px 10px;
      
    }
`;
const FileInputBox = styled.input`
    /* width: 66%; */
    display: none;
    border: none;
    background: none;
    &::file-selector-button{
      display: none;
    }
`;

const RentalFeeBox = styled.div`

  display: flex;
  margin: 10px 0px;
`;
const RentalFee = styled.div`
height: 10px;
line-height: 10px;
background: #6093FF;
color: #ffffff;
font-weight: 700;
font-size: 15px;
border-radius:10px;
padding: 10px;
white-space: nowrap; 
margin-left: 10px;
`;
const RangeInput = styled.input`
  width: 100%;
  margin: 10px 0px;
  -webkit-appearance: none;
  appearance: none;
  height: 10px;
  border-radius: 5px;
  background: #f2f2f2;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #6093FF;
    cursor: pointer;
  }

  /* &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #6093FF;
    cursor: pointer;
  } */
`;

const ModalContainer = styled.div`
  z-index: 1000;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #00000077;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  margin: 0 auto;
  width: 80%;
  height: 315px;
  max-width: 400px;
  border-radius: 30px;
  background: #ffffff;
  position: relative;
`;

const ModalBox2 = styled.div`
  margin: 0 auto;
  width: 80%;
  height: 400px;
  max-width: 400px;
  border-radius: 30px;
  background: #ffffff;
  
  position: relative;
  text-align: center;

`;

const ModalBtnBox = styled.div`
  position: absolute;
  width: 100%;
  bottom: 22px;
  display: flex;
  justify-content: space-evenly;
`;

const ModalBtn = styled.button`
  border: none;
  width: 40%;
  background: ${({ isLeft }) => (isLeft ? '#f5f5f5' : '#6093FF')};
  padding: 15px;
  text-align: center;
  border-radius: 15px;

  font-size: 15px;
  color:${({ isLeft }) => (isLeft ? '#aaaaaa' : '#FFFFFF')};
`;


const ModalText = styled.div`
  margin-top: 40px;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  line-height: 30px;
  padding: 0px 35px;
  color: #000000;

  & span{
    font-weight: 700;
    color: #f7d724;
  }

`;

const ModalText2 = styled.div`
    margin-top: 17px;
  text-align: center;
  font-size: 11px;
  font-weight: 600;
  /* line-height: 20px; */
  padding: 0px 35px;
  color: #c0c0c0;
`;

const PostEdit = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(); // 쿠키 사용을 위해
  const [isOpen, setIsOpen] = useState(false);
  const [todayDate, setTodayDate] = useState('');

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState("G 글로벌 캠퍼스");
  const [locationDetail, setLocationDetail] = useState('');
  const [rentalFee, setRentalFee] = useState(0);
  const [security, setSecurity] = useState('없음');
  const [needAt, setNeedAt] = useState('');
  const [returnAt, setReturnAt] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);

  const [isDoneModalOn, setIsDoneModalOn] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handlePost = async (e) => {
    e.preventDefault();

    if (title.length < 1) {
      window.alert("제목을 입력해주세요.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append('request', new Blob([JSON.stringify({
        title,
        location,
        locationDetail,
        rentalFee,
        security,
        needAt,
        returnAt,
        content
      })],
        {
          type: "application/json"
        }));
      formData.append('pic', file);

      const Response = await axios.post(process.env.REACT_APP_BACK_URL + "/post",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      if (Response.data.code != 200) {
        navigate("/signin");
      }
      if (Response.data.code === 200) {
        window.alert("작성 완료");
        navigate("/");
      }
      
    } catch (error) {
      window.alert("사진이 너무 크거나 잘못된 형식입니다.")
      setFile(null);
    }
  };

  useEffect(() => {
    if (!cookies.token) {
      navigate("/signin");
      return;
    }
    window.scrollTo(0, 0);

    // 오늘 날짜를 얻기 위해 현재 날짜 객체를 생성
    const today = new Date();

    // 시작 날짜의 최소 선택일을 오늘로 설정
    const todayString = today.toISOString().split('T')[0];
    setTodayDate(todayString);
    setNeedAt(todayString);
    setReturnAt(todayString);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setLocation(option);
    setIsOpen(false);
  };
  const handleStartDateChange = (e) => {
    setNeedAt(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setReturnAt(e.target.value);
  };


  return (
    <EditBox>
      <Header headerType={"close"} headerText={"학우들에게 요청하기"}></Header>
      <ContentBox>
        {/* <InputBoxTitle>제목</InputBoxTitle> */}
        <InputBox
          type="text"
          // ref={passwordRef}
          name="title"
          placeholder="제목"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        {/* <InputBoxTitle>내용</InputBoxTitle> */}
        <TextareaBox
          type="text"
          // ref={passwordRef}
          name="content"
          placeholder="내용(최대 100글자)"
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <InputContainer>
          <DropdownWrapper>
            <DropdownButton onClick={toggleDropdown}>
              <div>{location ? location.slice(2) : '위치 선택'}</div>
            </DropdownButton>
            <DropdownContent open={isOpen}>
              <DropdownItem href="#" onClick={() => handleOptionClick('G 글로벌 캠퍼스')}>
                글로벌 캠퍼스
              </DropdownItem>
              <DropdownItem href="#" onClick={() => handleOptionClick('M 메디컬 캠퍼스')}>
                메디컬 캠퍼스
              </DropdownItem>
              <DropdownItem href="#" onClick={() => handleOptionClick('G 비전타워')}>
                비전타워
              </DropdownItem>
              <DropdownItem href="#" onClick={() => handleOptionClick('G 가천관')}>
                가천관
              </DropdownItem>
              <DropdownItem href="#" onClick={() => handleOptionClick('G AI공학관')}>
                AI공학관
              </DropdownItem>
              <DropdownItem href="#" onClick={() => handleOptionClick('M 약학대학')}>
                약학대학
              </DropdownItem>
              <DropdownItem href="#" onClick={() => handleOptionClick('G 바나대')}>
                바나대
              </DropdownItem>
              <DropdownItem href="#" onClick={() => handleOptionClick('G 중앙도서관')}>
                중앙도서관
              </DropdownItem>
              <DropdownItem href="#" onClick={() => handleOptionClick('G 공과대학1')}>
                공과대학1
              </DropdownItem>
              <DropdownItem href="#" onClick={() => handleOptionClick('G 공과대학2')}>
                공과대학2
              </DropdownItem>
              <DropdownItem href="#" onClick={() => handleOptionClick('G 반도체대학')}>
                반도체대학
              </DropdownItem>
              <DropdownItem href="#" onClick={() => handleOptionClick('G 한의과대학')}>
                한의과대학
              </DropdownItem>
              <DropdownItem href="#" onClick={() => handleOptionClick('G 예체대1')}>
                예체대1
              </DropdownItem>
              <DropdownItem href="#" onClick={() => handleOptionClick('G 예체대2')}>
                예체대2
              </DropdownItem>
              <DropdownItem href="#" onClick={() => handleOptionClick('G 전자정보도서관')}>
                전자정보도서관
              </DropdownItem>
              <DropdownItem href="#" onClick={() => handleOptionClick('G 대학원')}>
                대학원
              </DropdownItem>
              <DropdownItem href="#" onClick={() => handleOptionClick('G 교육대학원')}>
                교육대학원
              </DropdownItem>
              <DropdownItem href="#" onClick={() => handleOptionClick('G 바이오나노연구원')}>
                바이오나노연구원
              </DropdownItem>
              <DropdownItem href="#" onClick={() => handleOptionClick('G 학생회관')}>
                학생회관
              </DropdownItem>
              <DropdownItem href="#" onClick={() => handleOptionClick('G 제1기숙사')}>
                제1기숙사
              </DropdownItem>
              <DropdownItem href="#" onClick={() => handleOptionClick('G 제2기숙사')}>
                제2기숙사
              </DropdownItem>
              <DropdownItem href="#" onClick={() => handleOptionClick('G 제3기숙사')}>
                제3기숙사
              </DropdownItem>
              <DropdownItem href="#" onClick={() => handleOptionClick('G 글로벌센터')}>
                글로벌센터
              </DropdownItem>
              <DropdownItem href="#" onClick={() => handleOptionClick('G 법과대학')}>
                법과대학
              </DropdownItem>
              <DropdownItem href="#" onClick={() => handleOptionClick('G 바개동')}>
                바개동
              </DropdownItem>
              <DropdownItem href="#" onClick={() => handleOptionClick('G 광장')}>
                광장
              </DropdownItem>
              <DropdownItem href="#" onClick={() => handleOptionClick('M 보건과학대학')}>
                보건과학대학
              </DropdownItem>
              <DropdownItem href="#" onClick={() => handleOptionClick('M 간호대학')}>
                간호대학
              </DropdownItem>
              <DropdownItem href="#" onClick={() => handleOptionClick('M 학생회관')}>
                메디컬 학생회관
              </DropdownItem>
              <DropdownItem href="#" onClick={() => handleOptionClick('M 의과대학')}>
                의과대학
              </DropdownItem>
              <DropdownItem href="#" onClick={() => handleOptionClick('M 기숙사')}>
                메디컬 기숙사
              </DropdownItem>
            </DropdownContent>
          </DropdownWrapper>
          <HalfInputBox
            type="text"
            // ref={passwordRef}
            name="locationDetail"
            placeholder="자세한 위치"
            onChange={(e) => {
              setLocationDetail(e.target.value);
            }}
          />
        </InputContainer>

        <InputBox
          type="text"
          // ref={passwordRef}
          name="security"
          placeholder="보증품을 입력하세요(ex 신분증, 현금)"
          onChange={(e) => {
            setSecurity(e.target.value);
          }}
        />
        {/* <RentalFeeBox>
          <RangeInput
            type="range"
            id="rentalFee"
            name="rentalFee"
            min={0}
            max={10000}
            step={500}
            value={rentalFee}
            onChange={(e) => {
              setRentalFee(e.target.value);
            }}
          />
          <RentalFee
          >{rentalFee == 0 ? "대여금" : rentalFee + "원"}</RentalFee>
        </RentalFeeBox> */}

        <DateWrapper>
          <DateInput
            type="date"
            id="needAt"
            name="needAt"
            value={needAt}
            onChange={handleStartDateChange}
            min={todayDate}
            required
          />
          <span>~</span>
          <DateInput
            type="date"
            id="returnAt"
            name="returnAt"
            value={returnAt}
            onChange={handleEndDateChange}
            min={needAt}  // 끝 날짜는 시작 날짜 이후만 선택 가능
            required
          />
        </DateWrapper>

        <FileInputBtn for="file" isFileSelected={file != null}>
          <div>사진 추가</div>
          <FileInputBox type="file" name="file" id="file" onChange={handleFileChange} />
        </FileInputBtn>

        <SubmitBtn onClick={() => {
              setIsDoneModalOn(true);
            }} >작성 완료</SubmitBtn>

      </ContentBox>

      {isDoneModalOn ?
      <ModalContainer>
        <ModalBox>
          <ModalText> 빌려주려는 학우가 대화를 원하는 경우 <span>카카오톡 알림톡</span>을 보내드려요! </ModalText>
          <ModalText2> *글을 작성한 후에는 수정과 삭제가 불가능합니다 </ModalText2>
          <ModalText2> *형법 제329조(절도) 타인의 재물을 절취한 자는 6년 이하의 징역 또는 1천만원 이하의 벌금에 처합니다 </ModalText2>
          <ModalBtnBox>
            <ModalBtn onClick={() => {
              setIsDoneModalOn(false);
            }} isLeft={true}>
              취소
            </ModalBtn>
            <ModalBtn onClick={handlePost} isMine={""}>
              확인
            </ModalBtn>
          </ModalBtnBox>
        </ModalBox>
      </ModalContainer>
      : null}
    </EditBox>
  );
};

export default PostEdit;