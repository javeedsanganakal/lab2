import React, { useState } from "react";

function searchFeature(props) {
  const [searchTerm, setSearchTerm] = useState();

  const onChangeSearchEvent = (e) => {
    setSearchTerm(e.target.value);
    props.refreshFunction(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={onChangeSearchEvent}
        placeholder="Search...."
      />
    </div>
  );
}

export default searchFeature;
