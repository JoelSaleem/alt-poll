import React, { useMemo } from "react";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { GradientTealBlue } from "@visx/gradient";
import letterFrequency, {
  LetterFrequency,
} from "@visx/mock-data/lib/mocks/letterFrequency";
import { scaleBand, scaleLinear } from "@visx/scale";

const verticalMargin = 120;

export type BarsProps = {
  width: number;
  height: number;
  events?: boolean;
  data: { optId: string; votes: number; title: string }[];
};

export const BarChart = ({
  width,
  height,
  events = false,
  data,
}: BarsProps) => {
  const xMax = width;
  const yMax = height - verticalMargin;

  // scales, memoize for performance
  const xScale = scaleBand<string>({
    range: [0, xMax],
    round: true,
    domain: data.map(({ optId }) => optId),
    padding: 0.4,
  });
  const yScale = scaleLinear<number>({
    range: [yMax, 0],
    round: true,
    domain: [0, Math.max(...data.map(({ votes }) => votes))],
  });

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <GradientTealBlue id="teal" />
      <rect width={width} height={height} fill="url(#teal)" rx={14} />
      <Group top={verticalMargin / 2}>
        {data.map((d) => {
          const letter = d.optId;
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - (yScale(d.votes) ?? 0);
          const barX = xScale(letter);
          const barY = yMax - barHeight;
          return (
            <>
              <Bar
                key={`bar-${letter}`}
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill="rgba(23, 233, 217, .5)"
                onClick={() => {
                  if (events)
                    alert(`clicked: ${JSON.stringify(Object.values(d))}`);
                }}
              />
              <text x={barX} y={barY - 12} style={{ color: "white" }}>
                {d.title} {d.votes}
              </text>
            </>
          );
        })}
      </Group>
    </svg>
  );
};
