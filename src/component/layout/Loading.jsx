import styled from "styled-components";
const Loding = styled.div`
  position: fixed;
  z-index: 1;
  top: 50%;
  width: 100%;
  /* height: 100%; */
  /* background-color: #ffffff; */
  & img{
    width: 20%;
    display: block;
    margin: 0 auto;
    opacity: 50%;
  }
`;
const Loading = () => {
    return (
        <Loding>
            <img src={"/image/spinner.gif"} alt="a" width="60%"/>
        </Loding>
    );
  };

export default Loading;