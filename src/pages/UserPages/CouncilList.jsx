import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import styled from "styled-components";
import Header from "../../components/layout/Header";

const CouncilBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  max-width: 700px;
  background: #ffffff;
`;

const SubTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #000000;
  margin-bottom: 10px;  
`;

const CampusAnnoBox = styled.div`
  background: #ffffff;
  margin-bottom: 20px;
  border-radius: 15px;
  box-shadow: rgba(215, 218, 220, 0.5) 0px 0px 15px;
  padding: 20px 20px;
`;

const BigText = styled.div`
  font-weight: 400;
  font-size: 25px;
  color : #379DFF;
  & span{ 
    font-size: 28px;
    color : #379DFF;
  }
`;

const SmallText = styled.div`
  font-size: 15px;
  font-weight: 400;
  color : #9e9e9e;
`;

const RealTime = styled.span`
  /* float: left;
  padding: 5px;
  font-size: 14px;
  margin-top: -5px;
  background: #ffdddd;
  color: #ff7979;
  border: 1px solid #ff7979;
  border-radius: 15px; */
`;


const ContentBox = styled.div`
  padding: 20px;
`;

const CollegeBox = styled.ul`
  background: #ffffff;
  margin-bottom: 20px;
  border-radius: 15px;
  box-shadow: rgba(215, 218, 220, 0.5) 0px 0px 15px;
  overflow: hidden;
  & a:not(:last-child) li{
      border-bottom: 1px solid #dddddd;
  }
`;

const CouncilImgBox = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid #eeeeee;
  border-radius: 50px;
  float: left;
  margin-right: 10px;
  overflow: hidden;
`;
const CouncilImg = styled.img`
  width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
`;

const CouncilContent = styled.div`
  display: inline-block;
`;

const CouncilItem = styled.li`
  list-style: none;
  padding: 15px 10px; 
  line-height: 25px;
`;

const CollegeName = styled.div`
    font-size: 15px;
    font-weight: 700;
    color: #000000;
    margin-bottom: 10px;
`;

const CouncilName = styled.div`
    font-weight: 500;
    color: #000000;
`;

const ItemInfo = styled.div`
    font-size: 15px;
    font-weight: 400;
    color: #aaaaaa;
`;

const CouncilList = () => {
  const [groupedCouncilList, setGroupedCouncilList] = useState([]); // 채팅방 리스트 상태
  const [councilCount, setCouncilCount] = useState(); 
  const [key, setKey] = useState(0);
  const [cookies] = useCookies(); // 쿠키 사용하기 위해
  const navigate = useNavigate(); // 페이지 이동 위해
  const location = useLocation();
  const [campus, setCampus] = useState();
  console.log(campus);


  useEffect(() => {
    const campusValue = new URLSearchParams(location.search).get('campus');
    setCampus(campusValue);
    const fetchCouncils = async () => {
      try {
        const response = await axios.get("http://" + process.env.REACT_APP_BACK_URL + "/council/all?campus="+campusValue, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        });

        setCouncilCount(response.data.length);
        const groupedData = response.data.reduce((acc, item, index) => {
          const key = item.college;
          if (index !== 0 && key !== response.data[index - 1].college) {
            acc.push([]);
          }
          
          acc[acc.length - 1].push(item);
          return acc;
        }, [[]]);

        setGroupedCouncilList(groupedData);
        console.log(groupedData);

      } catch (error) {
        console.error("오류 발생:", error);
      }
    };

    fetchCouncils();
  }, [cookies.token, navigate, key]); // [] 와 같이 비워도 됨.

  return (
    <CouncilBox>
      <Header headerText={"학생회"}></Header>

      <ContentBox>
        <SubTitle>총 {councilCount}개의 학생회에서 물품대여중🫶</SubTitle>
        <CampusAnnoBox>
          <BigText>{campus == 'global' ? "글로벌" : campus == 'medical' ? "메디컬" : "까아꿍"} 캠퍼스입니다🙂</BigText>
          <SmallText><RealTime>실시간</RealTime>으로 물품 잔여 개수를 확인하세요!</SmallText>
        </CampusAnnoBox>
        {groupedCouncilList.map((college, index) => (
          <div key={index}>
            <CollegeName>{college[0] != null ? college[0].college.slice(1) : null}</CollegeName>
            <CollegeBox>
              {college.map((council) => (
                <Link to={"/councils/" + council.councilId} >
                  <CouncilItem key={council.councilId}>
                    <CouncilImgBox>
                      <CouncilImg src={"http://" + process.env.REACT_APP_BACK_URL + "/image/" + council.imgPath}></CouncilImg>
                    </CouncilImgBox>
                    
                    <CouncilContent>
                      <CouncilName>{council.name}</CouncilName>
                      <ItemInfo>제공 물품 {council.providedItemCount} 대여 물품 {council.rentalItemCount}</ItemInfo>
                    </CouncilContent>
                  </CouncilItem>
                </Link>
              ))}
            </CollegeBox>
          </div>
        ))}
      </ContentBox>
    </CouncilBox>
  );
};

export default CouncilList;