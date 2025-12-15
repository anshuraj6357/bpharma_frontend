"use client";

import React from "react";
import {
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
  ResponsiveContainer,
} from "recharts";

import { cn } from "./utils";

// --- Constants for theme mapping ---
const THEMES = {
  light: "",
  dark: ".dark",
};

// --- Chart Context ---
const ChartContext = React.createContext(null);

export function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}

// --- Chart Container ---
export function ChartContainer({ id, className, children, config = {}, ...props }) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "flex aspect-video justify-center text-xs border-border/50 bg-background [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

// --- Chart Style Generator ---
export function ChartStyle({ id, config }) {
  const colorConfig = Object.entries(config).filter(
    ([, item]) => item.theme || item.color
  );

  if (!colorConfig.length) return null;

  const css = Object.entries(THEMES)
    .map(([theme, prefix]) => {
      const vars = colorConfig
        .map(([key, itemConfig]) => {
          const color =
            (itemConfig.theme && itemConfig.theme[theme]) || itemConfig.color;
          return color ? `  --color-${key}: ${color};` : "";
        })
        .join("\n");

      return `${prefix} [data-chart="${id}"] {\n${vars}\n}`;
    })
    .join("\n");

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

// --- Tooltip Wrapper ---
export const ChartTooltip = RechartsTooltip;

export function ChartTooltipContent({
  active,
  payload,
  label,
  hideLabel = false,
  hideIndicator = false,
  indicator = "dot",
  className,
  formatter,
}) {
  const { config } = useChart();

  if (!active || !payload?.length) return null;

  const items = payload.map((item, idx) => {
    const key = item.name || item.dataKey || "value";
    const itemConfig = config[key] || {};
    const color = item.stroke || item.fill || "var(--color-primary)";

    return (
      <div
        key={idx}
        className={cn(
          "flex items-center gap-2 text-xs",
          indicator === "line" && "items-end"
        )}
      >
        {!hideIndicator && (
          <div
            className={cn("h-2 w-2 rounded-[2px]")}
            style={{ backgroundColor: color }}
          />
        )}
        <span className="text-muted-foreground">{itemConfig.label || key}</span>
        <span className="ml-auto font-mono font-medium text-foreground">
          {formatter ? formatter(item.value) : item.value}
        </span>
      </div>
    );
  });

  return (
    <div
      className={cn(
        "border-border/50 bg-background rounded-lg border px-3 py-2 shadow-xl",
        className
      )}
    >
      {!hideLabel && label && (
        <div className="mb-1 font-medium text-foreground">{label}</div>
      )}
      {items}
    </div>
  );
}

// --- Legend Wrapper ---
export const ChartLegend = RechartsLegend;

export function ChartLegendContent({
  payload,
  hideIcon = false,
  className,
  verticalAlign = "bottom",
}) {
  const { config } = useChart();

  if (!payload?.length) return null;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-3 text-xs",
        verticalAlign === "top" ? "pb-2" : "pt-2",
        className
      )}
    >
      {payload.map((item, idx) => {
        const key = item.dataKey || "value";
        const itemConfig = config[key] || {};
        const color = item.color || item.stroke || "var(--color-primary)";

        return (
          <div key={idx} className="flex items-center gap-1.5">
            {!hideIcon && (
              <div
                className="h-2 w-2 rounded-[2px]"
                style={{ backgroundColor: color }}
              />
            )}
            <span>{itemConfig.label || key}</span>
          </div>
        );
      })}
    </div>
  );
}
