import React, { useState } from "react";

import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryLegend,
  VictoryTooltip,
  VictoryVoronoiContainer
} from "victory";
import { preBudgetTaxCalculator } from "../util/preBudgetIncometaxCalculator";
import { postBudgetTaxCalculator } from "../util/postBudgetIncometaxCalculator";
import eventEmitter from "../util/eventEmitter";
import _ from "lodash";

function BudgetChart() {
  const [customChartData, setCustomChartData] = useState(null);
  eventEmitter.once("SALARY_CHANGE", data => {
    setCustomChartData(data);
  });
  return (
    <div
      style={{
        padding: "20px"
      }}
    >
      <VictoryChart
        theme={VictoryTheme.material}
        // containerComponent={<VictoryVoronoiContainer />}
      >
        <VictoryLegend
          centerTitle
          orientation="horizontal"
          gutter={20}
          style={{
            border: { stroke: "black" },
            data: { fontSize: "8px" },
            labels: { fontSize: 8 }
          }}
          data={[
            { name: "Pre Without 80c", symbol: { fill: "black" } },
            { name: "Pre With 80c", symbol: { fill: "green" } },
            { name: "Post", symbol: { fill: "gold" } },
            { name: "Custom Salaried", symbol: { fill: "silver" } }
          ]}
        />
        <VictoryLine
          domain={{ x: [0, 2000] }}
          // labelComponent={<VictoryTooltip />}
          // labels={({ datum }) => datum.y.toFixed(2)}
          style={{
            data: { stroke: "black" },
            parent: { border: "1px solid #ccc" },
            labels: { fill: "black" }
          }}
          y={datum => preBudgetTaxCalculator(datum.x * 1000) / 1000}
        />
        <VictoryLine
          domain={{ x: [0, 2000] }}
          // labelComponent={<VictoryTooltip />}
          // labels={({ datum }) => datum.y.toFixed(2)}
          style={{
            data: { stroke: "green" },
            parent: { border: "1px solid #ccc" },
            labels: { fill: "green" }
          }}
          y={datum =>
            preBudgetTaxCalculator(datum.x * 1000, {
              d80CAmt: 150000
            }) / 1000
          }
        />
        <VictoryLine
          domain={{ x: [0, 2000] }}
          // labelComponent={<VictoryTooltip />}
          // labels={({ datum }) => datum.y.toFixed(2)}
          style={{
            data: { stroke: "gold" },
            parent: { border: "1px solid #ccc" },
            labels: { fill: "gold" }
          }}
          y={datum => postBudgetTaxCalculator(datum.x * 1000) / 1000}
        />
        <VictoryLine
          // labelComponent={<VictoryTooltip />}
          // labels={({ datum }) => datum.y.toFixed(2)}
          domain={{ x: [0, 2000] }}
          style={{
            data: { stroke: "silver" },
            parent: { border: "1px solid #ccc" },
            labels: { fill: "silver" }
          }}
          y={datum =>
            preBudgetTaxCalculator(datum.x * 1000, {
              d80CAmt: 150000 * (_.get(customChartData, "CLAIM_80C", 0) / 100),
              salaryBreakup: customChartData
            }) / 1000
          }
        />
      </VictoryChart>
    </div>
  );
}

export default BudgetChart;
