import React, { useState } from "react";

import BarChartComponent from "./BarChart";
import AreaChart from "./AreaChart";
import Wrapper from "../assets/wrappers/ChartsContainer";
import { useSelector } from "react-redux";

const ChartsContainer = () => {
  const [barchart, setbarchart] = useState(true);
  const { monthlyApplications: data } = useSelector((store) => store.alljobs);
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setbarchart(!barchart)}>
        {barchart ? "BarChart" : "AreaChart"}
      </button>
      {barchart ? <BarChartComponent data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
};

export default ChartsContainer;
