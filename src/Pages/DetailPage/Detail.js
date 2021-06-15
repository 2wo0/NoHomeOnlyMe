import DetailHeader from './components/DetailHeader';
import DetailInfo from './components/DetailInfo';
import DetailOtherRoom from './components/DetailOtherRoom';
import LocationMap from './components/LocationMap';
import PhotoList from './components/PhotoList';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { API } from '../../Utils/config';

function Detail({ changeModalOpen, changeType }) {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`${API}/room/${1}`)
      .then(res => res.json())
      .then(data => {
        setData(data);
      });
  }, []);

  return (
    <Wrapper>
      {data.RESULT && (
        <>
          <DetailHeader header={data.RESULT.detail_header} />
          <DetailInfo info={data.RESULT.detail_info} />
          <PhotoList
            image={data.RESULT.detail_images}
            changeModalOpen={changeModalOpen}
            changeType={changeType}
          />
          <LocationMap map={data.RESULT.maps} />
          <DetailOtherRoom data={data.RESULT.other_rooms} />
        </>
      )}
    </Wrapper>
  );
}

export default Detail;

const Wrapper = styled.div`
  width: 1180px;
  height: auto;
  margin: 0 auto;
`;
