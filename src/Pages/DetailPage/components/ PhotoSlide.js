import styled from 'styled-components';

function PhotoSlide({ changeModalOpen }) {
  const closeModal = () => {
    changeModalOpen(false);
  };

  return (
    <Wrapper>
      <PhotoWrapper>
        <CountWrapper>
          <Count>1/13</Count>
        </CountWrapper>
        <Close className="xi-close" onClick={closeModal}></Close>
        <Left className="xi-angle-left"></Left>
        <Right className="xi-angle-right"></Right>
      </PhotoWrapper>
    </Wrapper>
  );
}

export default PhotoSlide;

const Wrapper = styled.div`
  width: 100%;
  height: 692px;
`;

const PhotoWrapper = styled.div`
  position: relative;
  width: 800px;
  height: 550px;
  margin: 0 auto;
  border: 1px solid black;
`;

const CountWrapper = styled.div`
  position: absolute;
  width: 70px;
  height: 40px;
  background-color: #2f2f2f;
  border: 1px solid black;
  border-radius: 2px;
  opacity: 0.9;
  top: 15px;
  left: -15px;
`;

const Count = styled.div`
  padding: 0px 18px;
  line-height: 40px;
  color: #fff;
  font-size: 14px;
  text-align: center;
`;

const Close = styled.span`
  position: absolute;
  font-size: 30px;
  left: 850px;
  cursor: pointer;
`;

const Left = styled.button`
  position: absolute;
  width: 40px;
  height: 80px;
  background-color: #2f2f2f;
  color: #fff;
  font-size: 20px;
  border: 1px solid #fff;
  opacity: 0.9;
  top: 50%;
  left: -101px;
  cursor: pointer;
`;

const Right = styled(Left)`
  left: 850px;
`;
