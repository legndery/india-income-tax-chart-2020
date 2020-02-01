import React from "react";
import "./App.css";

import PreBudgetChart from "./components/BudgetChart";
import SalaryBreakup from "./components/SalaryBreakup";
function App() {
  const CustomChartData = {}
  return (
    <div className="App">
      <div className="row">
        <div className="column">
          <PreBudgetChart />
        </div>
        <div className="column">
          <SalaryBreakup/>
        </div>
      </div>
    </div>
  );
}

export default App;
