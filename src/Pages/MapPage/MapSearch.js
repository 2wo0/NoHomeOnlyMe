import React from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';

export default function MapSearch({
  setFilterBox,
  setSearch,
  getMapData,
  getMapDataSearch,
}) {
  const onKeyPressHandler = e => {
    if (e.code === 'Enter') {
      getMapDataSearch(e.target.value);
    }
  };

  const delayedQueryCall = debounce(q => {
    return setSearch(q);
  }, 200);

  return (
    <SearchBox onClick={() => setFilterBox(false)}>
      <SearchIcon className="fas fa-search" />
      <SearchInput
        type="text"
        placeholder="서천동"
        onKeyPress={onKeyPressHandler}
      />
    </SearchBox>
  );
}

const SearchBox = styled.div`
  padding: 10px 13px;
  line-height: 28px;
  color: rgb(148, 148, 148);
  border-right: 1px solid rgb(214, 214, 214);
`;

const SearchIcon = styled.i`
  margin-right: 5px;
  font-weight: 400;
`;

const SearchInput = styled.input`
  width: 232px;
  height: 35px;
  margin-right: 84px;
  border: none;
  outline: none;
  color: rgb(34, 34, 34);
  font-size: 15px;
`;
