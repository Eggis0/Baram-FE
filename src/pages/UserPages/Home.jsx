import MenuBar from "../../components/layout/MenuBar";
import Header from "../../components/layout/Header";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import RecentPosts from "../../components/page/Home/RecentPosts";
import Footer from "../../components/layout/Footer";
import { useCookies } from "react-cookie";
import moment from "moment";
import axios from "axios";
import CouncilList from "./CouncilList";
import { useNavigate } from "react-router-dom";

// 학생회 캠퍼스 선택 박스 Parent
const CampusMoveBox = styled.div`
  position: sticky;
  top: -5px;
  z-index: 10;
  background: rgb(255, 255, 255); /* 반투명 배경 색상 */
  padding: 0px 20px;
  border-bottom: 1px solid #eeeeee;
`;

// 학생회 캠퍼스 선택 박스 Child
const CampusBox = styled.button`
  border: none;
  background: none;
  width: 50%;
  outline: none;
  padding-top: 5px;
  /* background: #ffffff; */
  box-sizing: border-box;
  position: relative;
`;

// 학생회 선택 Text
const CampusText = styled.span`
  text-align: center;
  padding: 20px 20px;
  font-weight: 800;
  font-size: 16px;
  color: ${({ isOn }) => (isOn ? "#000000" : "#bcbcbc")};
  position: relative;
  display: inline-block;
  z-index: 1;
`;

// 애니메이션을 위한 ActiveBorder
const ActiveBorderBox = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const ActiveBorder = styled.div`
  position: absolute;
  bottom: 0;
  left: ${({ position }) => (position == 0 ? "0%" : "50%")};

  width: 50%;
  transition: left 0.3s ease, width 0.3s ease;
  border-radius: 3px;
  /* padding: 0px 20px; */
`;

const ActiveBorderColor = styled.div`
  height: 3px;
  border-radius: 100px;
  width: 100px;
  margin: 0px auto;
  background-color: #6093ff;
`;

const HomeContainer = styled.div`
  position: relative;
  height: auto;
`;

const Container = styled.div`
  padding: 0px 20px;
`;

const Search = styled.div`
  padding: 0px 20px;
  box-sizing: border-box;
  position: relative;
  width: 100%;
`;

const SearchBox = styled.div`
  background: #f5f5f5;
  height: 40px;
  width: 100%;
  border: none;
  z-index: 5;
  box-sizing: border-box;
  padding: 0px 20px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InputBox = styled.input`
  font-weight: 400;
  font-size: 16px;
  color: #000000;
  outline: none;
  border: none;
  background: none;
  display: block;
  flex: 1;
  width: 0px;
  &::placeholder {
    color: #bcbcbc;
    font-weight: 400;
    font-size: 16px;
  }
`;

const ResultBox = styled.ul`
  ${({ isVisiable }) => (isVisiable ? "display: block;" : "display: none;")}
  background: #f5f5f5;
  width: 100%;
  margin: 20px auto;
  box-sizing: border-box;
  padding: 10px 20px;
  border-radius: 15px;
  list-style: none;
  z-index: 200;

  & li {
    padding: 10px 0px;
    line-height: 18px;
    list-style: none;
    font-size: 16px;
    color: #828282;
    display: flex;
    justify-content: space-between;
  }
`;

const ResultPart = styled.div`
  padding: 10px 0px;
  border-bottom: ${({ isCouncilResult }) =>
    isCouncilResult ? "1px solid #eeeeee" : "none"};
`;

const CouncilName2 = styled.div`
  color: #828282;
`;
const CouncilImg = styled.img`
  width: 32px;
  height: 32px;
  background: #ffffff;
  border-radius: 100px;
  margin-right: 10px;
`;
const CouncilResult = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0px;
`;

const CouncilName = styled.span`
  color: #6093ff;
`;

const Request = styled.span`
  display: inline-block;
  background: #6093ff;
  padding: 5px 10px;
  font-size: 13px;
  border-radius: 100px;
  font-weight: 600;
  color: #ffffff;
`;

const NoResult = styled.span`
  display: inline-block;
  font-size: 15px;
  line-height: 25px;
  font-weight: 500;
  border-radius: 100px;
  color: #d1d1d1;
  flex: 1;
`;

const AlertBox = styled.div`
  margin-top: 3px;
  display: inline-block;
  height: 20px;
  width: 20px;
  background: #e4e4e4;
  border-radius: 100px;
  text-align: center;
  font-weight: 900;
  color: #ffffff;
  margin-right: 5px;
`;

const SearchIcon = styled.img`
  width: 18px;
  margin-right: 10px;
`;

const CancleBtn = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 100px;
  background: #bcbcbc;
  text-align: center;
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const CancleIcon = styled.img`
  margin: 0px auto;
  width: 18px;
  height: 18px;
`;

const HearTheVoiceBox = styled.div`
  /* background: #eeeeee; */
  width: 100%;
  /* height: 300px; */
  padding: 0px 20px;
  box-sizing: border-box;
`;

const HearTheVoiceTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

const WriteHearTheVoice = styled.div`
  box-sizing: border-box;
  border-radius: 100px;
  width: 100%;
  background: #6093ff;
  color: #eeeeee;
  text-align: center;
  padding: 7px;
  font-size: 16px;
  font-weight: 700;
`;

const Voices = styled.div`
  margin: 20px 0px;
  text-align: center;
  height: 200px;
  overflow: scroll;
  border: 1px solid #eeeeee;
  padding: 10px 5px;
  border-radius: 10px;
`;

const Voice = styled.span`
  padding: 7px 10px;
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
  color: #bcbcbc;
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
  /* align-items: center; */
`;
const ModalBox2 = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 450px;
  max-width: 400px;
  border-radius: 30px 30px 0px 0px;
  background: #ffffff;

  position: absolute;
  bottom: 0;
  text-align: center;
`;

const ModalText = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 20px;
  font-weight: 800;
  color: #000000;
  /* line-height: 30px; */
`;

const ModalBtnBox = styled.div`
  position: absolute;
  width: 100%;
  bottom: 22px;
  display: flex;
  justify-content: space-evenly;
  gap: 10px;
  padding: 20px;
  box-sizing: border-box;
`;

const ModalBtn = styled.button`
  box-sizing: border-box;
  border: none;
  width: 100%;
  /* margin: 0px 20px; */
  background: ${({ isLeft }) => (isLeft ? "#f5f5f5" : "#6093FF")};
  padding: 15px;
  text-align: center;
  border-radius: 15px;
  font-weight: 500;
  font-size: 18px;
  color: ${({ isLeft }) => (isLeft ? "#828282" : "#FFFFFF")};
`;

const WriteVoiceBox = styled.div`
  padding: 20px 20px 0px 20px;
  text-align: left;
`;
const TextBoxTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
`;
const TextBoxSubTitle = styled.div`
  font-size: 14px;
  color: #bcbcbc;
`;

const TextBox = styled.input`
  margin-top: 10px;
  background: #f5f5f5;
  height: 40px;
  border-radius: 10px;
  width: 100%;
  border: none;
  outline: none;
  padding: 0px 10px;
  box-sizing: border-box;
`;

const Ad = styled.div`
  padding: 20px;
  /* height: 50px; */
  background: #f7f7f7;
  margin: 20px 0px;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #828282;
`;

const SubTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  text-align: center;
`;

const Info = styled.div`
  font-size: 14px;
  color: #828282;
  font-weight: 500;
  & span {
    color: #bcbcbc;
    margin-right: 5px;
  }
  & div {
    margin: 5px 0px;
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const [isDoneModalOn, setIsDoneModalOn] = useState(false);
  const [cookies, setCookies] = useCookies();
  const [campus, setCampus] = useState("global");

  const [opinion, setOpinion] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [keyword, setKeyword] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [results, setResults] = useState([]);
  const [results2, setResults2] = useState([]);
  const [borderPosition, setBorderPosition] = useState(0);
  const [borderWidth, setBorderWidth] = useState(0);
  const DEBOUNCE_TIME = 300;

  const [voiceData, setVoiceData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_BACK_URL + "/voice",
          {}
        );
        setVoiceData(response.data.data);
      } catch (error) {
        console.error("오류 발생:", error);
      }
    };
    fetchData();
  }, [isDoneModalOn]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedSearchValue(keyword);
    }, DEBOUNCE_TIME);

    return () => clearTimeout(debounce);
  }, [keyword]);

  useEffect(() => {
    const getResults = async () => {
      try {
        if (debouncedSearchValue.length === 0) {
          setResults([]);
          setResults2([]);
          return;
        }
        const response = await axios.get(
          `${process.env.REACT_APP_BACK_URL}/council-item/search/${debouncedSearchValue}`
        );
        setResults(response.data.data);
        const response2 = await axios.get(
          `${process.env.REACT_APP_BACK_URL}/council/search/${debouncedSearchValue}`
        );
        setResults2(response2.data.data);
      } catch (error) {
        console.log("오류 발생: ", error);
      }
    };
    getResults();
  }, [debouncedSearchValue]);

  const handleSearch = (e) => {
    setKeyword(e.target.value);
  };

  const handleCancle = () => {
    setKeyword("");
  };

  const handleCampusClick = (campusType, position) => {
    setCampus(campusType);
    setCookies("campus", campusType, {
      path: "/",
      expires: moment().add(1, "hours").toDate(),
    });
    setBorderPosition(position);
  };

  const handleAddVoice = async (e) => {
    e.preventDefault();

    // 입력을 아에 안했는지 검사
    if (opinion.length < 1) {
      window.alert("한마디를 입력해주세요!");
      setOpinion("");
      return;
    }
    if (phoneNumber.length < 1) {
      window.alert("전화번호 미입력시 이벤트 응모에 포함되지 않습니다.");
      setPhoneNumber("응모X");
    }
    try {
      const signUpResponse = await axios.post(
        process.env.REACT_APP_BACK_URL + "/voice",
        {
          opinion,
          phoneNumber,
        }
      );
      // 성공시
      if (signUpResponse.data.code === 200) {
        window.alert("작성 완료");
        setIsDoneModalOn(false);
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  return (
    <HomeContainer>
      <Header headerType={"home"}></Header>
      <Search>
        <SearchBox>
          <SearchIcon src="/image/search.svg"></SearchIcon>
          <InputBox
            type="text"
            name="search"
            placeholder="무엇이 필요한가요?"
            onChange={handleSearch}
            value={keyword}
            autoComplete="off"
          ></InputBox>
          {keyword !== "" && (
            <CancleBtn onClick={handleCancle}>
              <CancleIcon src="/image/cancle.svg"></CancleIcon>
            </CancleBtn>
          )}
        </SearchBox>
        <ResultBox isVisiable={keyword.length !== 0}>
          <ResultPart isCouncilResult={true}>
            {results2.map((result, index) => (
              <Link to={`/councils/${result.councilId}`} key={index}>
                <CouncilResult>
                  <CouncilImg
                    src={
                      process.env.REACT_APP_BACK_URL +
                      "/image/" +
                      result.imgPath
                    }
                  ></CouncilImg>
                  <CouncilName2>{result.councilName}</CouncilName2>
                </CouncilResult>
              </Link>
            ))}
          </ResultPart>
          <ResultPart>
            {results.map((result, index) => (
              <Link to={`/councils/${result.councilId}`} key={index}>
                <li>
                  <span>{result.name}</span>
                  <CouncilName>{result.councilName}</CouncilName>
                </li>
              </Link>
            ))}
          </ResultPart>

          {results.length == 0 && results2.length == 0 ? (
            <li>
              <NoResult>조회된 물품이 없습니다.</NoResult>
              {/* <Link to={"/write"}>
              <Request>요청하기</Request>
            </Link> */}
            </li>
          ) : null}
        </ResultBox>
      </Search>
      <CampusMoveBox>
        <CampusBox
          onClick={() => handleCampusClick("global", 0)}
          isOn={campus === "global"}
        >
          <CampusText isOn={campus === "global"}>글로벌</CampusText>
        </CampusBox>
        <CampusBox
          onClick={() => handleCampusClick("medical", 1)}
          isOn={campus === "medical"}
        >
          <CampusText isOn={campus === "medical"}>메디컬</CampusText>
        </CampusBox>

        <ActiveBorderBox>
          <ActiveBorder position={borderPosition}>
            <ActiveBorderColor></ActiveBorderColor>
          </ActiveBorder>
        </ActiveBorderBox>
      </CampusMoveBox>
      <Container>
        <CouncilList campus={campus} />
      </Container>
      <HearTheVoiceBox>
        <HearTheVoiceTitle>학우들의 소리함</HearTheVoiceTitle>
        <Voices>
          {voiceData.map((voice) => (
            <Voice>{voice.opinion}</Voice>
          ))}
        </Voices>

        <WriteHearTheVoice
          onClick={() => {
            setIsDoneModalOn(true);
          }}
        >
          작성하기
        </WriteHearTheVoice>
      </HearTheVoiceBox>
      <Ad>
        <Title>리뉴얼 기념 이벤트 · 한마디 남기고 치킨 먹자</Title>

        <Info>
          <div>
            <span>방법:</span> 아래 학우들의 소리함에 전화번호와 함께 방명록
            남기기
          </div>
          <div>
            <span>기간:</span> 9/2 ~ 9/7
          </div>
          <div>
            <span>발표:</span> 9/8 오후 1시, 사이트 메인에서 공지
          </div>
          <div>
            <span>상품:</span> 황금올리브 치킨 1명 · 스타벅스 아메리카노 2명
          </div>
          <div>* 같은 전화번호로 여러 번 응모해도 추첨 확률은 동일합니다.</div>
        </Info>
      </Ad>
      <Footer></Footer>

      {isDoneModalOn ? (
        <ModalContainer>
          <ModalBox2>
            <ModalText>작성하기</ModalText>

            <WriteVoiceBox>
              <TextBoxTitle>한마디</TextBoxTitle>
              <TextBox
                type="text"
                name="voice"
                placeholder="응원의 한마디나 요청사항을 적어주세요!"
                //  onChange={}
                autoComplete="off"
                onChange={(e) => {
                  setOpinion(e.target.value);
                }}
              ></TextBox>
            </WriteVoiceBox>

            <WriteVoiceBox>
              <TextBoxTitle>전화번호</TextBoxTitle>
              <TextBoxSubTitle>
                * 이벤트 기간에만 수집되는 항목입니다.
              </TextBoxSubTitle>
              <TextBoxSubTitle>
                * 외부에 공개되지 않으며 추첨을 위해서만 사용됩니다.
              </TextBoxSubTitle>

              <TextBox
                type="text"
                name="phone"
                placeholder="010-XXXX-XXXX"
                //  onChange={}
                value={phoneNumber}
                autoComplete="off"
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              ></TextBox>
            </WriteVoiceBox>
            <ModalBtnBox>
              <ModalBtn
                onClick={() => {
                  setIsDoneModalOn(false);
                }}
                isLeft={true}
              >
                닫기
              </ModalBtn>
              <ModalBtn onClick={handleAddVoice} isLeft={false}>
                완료
              </ModalBtn>
            </ModalBtnBox>
          </ModalBox2>
        </ModalContainer>
      ) : null}
    </HomeContainer>
  );
};

export default Home;
