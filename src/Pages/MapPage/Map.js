import React, { useState, useEffect, useRef } from 'react';
import { CustomOverlay } from './CustomOverlay';
import { API } from '../../Utils/config';

const { naver } = window;

export default function Map({
  center,
  zoom,
  roomList,
  subwayList,
  univList,
  getInitData,
  getData,
  getRoomListData,
}) {
  const [map, setMap] = useState(null);
  const markersRef = useRef([]);
  const mapRef = useRef();

  useEffect(() => {
    const map = mapRef.current;
    const mapObj = new naver.maps.Map(map);

    naver.maps.Event.addListener(mapObj, 'dragend', function () {
      getData(mapObj.center._lat, mapObj.center._lng, zoom);
    });

    window.naver.maps.Event.addListener(
      map,
      'zoom_changed',
      function (changed_zoom) {
        getData(mapObj.center._lat, mapObj.center._lng, changed_zoom);
      }
    );

    setMap(mapObj);
    getInitData();
  }, []);

  const createMarker = arr => {
    const createdMarkers = arr.map(
      ({ latitude, longitude, name, type, room_id }) => {
        const position = new naver.maps.LatLng(latitude, longitude);
        let count = 0;
        if (room_id) {
          count = room_id.length;
        }

        return new CustomOverlay({
          map,
          position,
          name,
          type,
          count,
          room_id,
          getRoomListData,
        });
      }
    );
    markersRef.current.push(createdMarkers);
  };

  const deleteMarker = () => {
    markersRef.current.forEach(markerlist =>
      markerlist.forEach(marker => marker && marker.setMap(null))
    );
    markersRef.current = [];
  };

  useEffect(() => {
    if (!map) return;
    if (markersRef.current.length) {
      deleteMarker();
    }

    if (roomList)
      createMarker(
        roomList.map(el => {
          return { ...el, type: 'room' };
        })
      );
    if (subwayList)
      createMarker(
        subwayList.map(el => {
          return { ...el, type: 'subway' };
        })
      );

    if (univList)
      createMarker(
        univList.map(el => {
          return { ...el, type: 'univ' };
        })
      );
  }, [map, roomList, subwayList, univList]);

  return (
    <div>
      <div
        style={{ width: '79.3%', height: '86.7vh', position: 'absolute' }}
        id="naver"
        ref={mapRef}
      />
    </div>
  );
}
