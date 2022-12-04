import React, { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";
import { StatisticsProps } from "../../pages/statistics";

const StatisticsComponent: React.FC<{ statistics: Array<StatisticsProps> }> = ({
  statistics,
}) => {
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
    const yRenderer = am5xy.AxisRendererY.new(root, {});

    xRenderer.labels.template.setAll({
      rotation: 0,
      centerY: am5.p50,
      centerX: am5.p50,
      fontSize: 20,
      fontWeight: "500",
      paddingTop: 10,
      fill: am5.color("#fff"),
    });

    yRenderer.labels.template.setAll({
      fontSize: 20,
      fontWeight: "500",
      fill: am5.color("#fff"),
    });

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField: "lineName",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: yRenderer,
      })
    );

    // Create series
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Series 1",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "savedQuantity",
        sequencedInterpolation: true,
        categoryXField: "lineName",
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
    <div
      id="chartdiv"
      style={{
        width: "100%",
        height: "500px",
        background: "#7e4ccb",
        borderRadius: "5px",
        padding: "5px",
      }}
    ></div>
  );
};

export default StatisticsComponent;
