import React, { useLayoutEffect, useState, useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { FixedHead } from "../../components";
import { WithAuth } from "../../global-hoc";
import { Backend } from "../../services/backend";
import { ApiRoutes } from "../../api-routes";
import { showError } from "../../utils";
import { useLoadingSpinner } from "../../hooks";

interface StatisticsProps {
  label: string;
  value: number;
}

const Statistics: React.FC = WithAuth(
  () => {
    const [statistics, setStatistic] = useState<Array<StatisticsProps>>([]);

    const { setFalse, setTrue } = useLoadingSpinner();

    useEffect(() => {
      setTrue();
      Backend.get(ApiRoutes.GET_BUS_STATISTICS)
        .then((res: any) => setStatistic(res.data))
        .catch(showError)
        .finally(setFalse);
    }, []);

    useLayoutEffect(() => {
      const root = am5.Root.new("chartdiv");

      // Set themes
      root.setThemes([am5themes_Animated.new(root)]);

      // Create chart
      const chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: true,
          panY: true,
          wheelX: "panX",
          wheelY: "zoomX",
          pinchZoomX: true,
        })
      );

      // Add cursor
      const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
      cursor.lineY.set("visible", false);

      // Create axes
      const xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
      xRenderer.labels.template.setAll({
        rotation: -90,
        centerY: am5.p50,
        centerX: am5.p100,
        paddingRight: 15,
      });

      const xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          maxDeviation: 0.3,
          categoryField: "country",
          renderer: xRenderer,
          tooltip: am5.Tooltip.new(root, {}),
        })
      );

      const yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          maxDeviation: 0.3,
          renderer: am5xy.AxisRendererY.new(root, {}),
        })
      );

      // Create series
      const series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Series 1",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value",
          sequencedInterpolation: true,
          categoryXField: "country",
          tooltip: am5.Tooltip.new(root, {
            labelText: "{valueY}",
          }),
        })
      );

      series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5 });
      series.columns.template.adapters.add("fill", (fill, target) =>
        chart.get("colors")?.getIndex(series.columns.indexOf(target))
      );

      series.columns.template.adapters.add("stroke", (stroke, target) =>
        chart.get("colors")?.getIndex(series.columns.indexOf(target))
      );

      xAxis.data.setAll(statistics);
      series.data.setAll(statistics);

      // Make stuff animate on load
      series.appear(1000);
      chart.appear(1000, 100);
      return () => {
        root.dispose();
      };
    }, [statistics]);

    return (
      <div className="flex justify-center align-center w-100 h-100">
        <FixedHead title="Estatísticas" />
        <div
          id="chartdiv"
          style={{
            width: "90%",
            height: "500px",
            background: "#7e4ccb",
            borderRadius: "5px",
            padding: "5px",
          }}
        ></div>
      </div>
    );
  },
  true,
  true
);

export default Statistics;
