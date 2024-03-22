import { useState, useRef, useEffect } from "preact/hooks";
import { Box, styled, Tab, Tabs } from "@mui/material";
import BodyBuilder from "./BodyBuilder";
import UrlBar from "./UrlBar";
import RequestResponse from "./RequestResponse";
import MuiLink from "@/components/MuiLink";
import { useAppPreferences } from "@/hooks/usePreferences";
import HorizontalDivision from "@/components/HorizontalDivision";
import Split from "react-split";

const RequestBuilderWrapper = styled(Box)`
  flex-direction: column;
  height: 100%;
  display: flex;
  .split {
    display: flex;
    flex-direction: row;
  }

  .gutter {
    background-color: ${({ theme }) => theme.palette.grey["900"]};
    background-repeat: no-repeat;
    background-position: 50%;
    transition: 0.125s ease-in-out background-color;
    &:hover {
      background-color: ${({ theme }) => theme.palette.secondary.main};
    }
    cursor: ns-resize;
  }

  .gutter.gutter-horizontal {
    cursor: col-resize;
  }
`;

export default function RequestBuilder() {
  const [preferences, setPreferences] = useAppPreferences();
  const [separator, setSeparator] = useState(preferences.bodyBuilderSeperatorLocation);
  const [draggingSeparator, setDraggingSeparator] = useState(false);
  const [tabIndex, setTabIndex] = useState(preferences.requestBuilderTabIndex);

  const separatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPreferences((prev) => ({
      ...prev,
      bodyBuilderSeperatorLocation: separator,
    }));
  }, [separator]);

  useEffect(() => {
    setPreferences((prev) => ({ ...prev, requestBuilderTabIndex: tabIndex }));
  }, [tabIndex]);

  function handleMouseMove(evt: any): void {
    if (!draggingSeparator || !separatorRef.current) return;
    evt.preventDefault();

    const yInput = evt.pageY;

    const pageUpperY = Math.max(evt.pageY, separatorRef.current.parentElement!.offsetTop);
    const pageLowerY = separatorRef.current.parentElement!.clientHeight + separatorRef.current.parentElement!.offsetTop;

    // Clamp y input between upper and lower bounds of container
    // and subtract offsetTop
    const clampY =
      (yInput > pageLowerY ? pageLowerY : yInput < pageUpperY ? pageUpperY : yInput) -
      separatorRef.current.parentElement!.offsetTop;

    const percentage = (clampY / separatorRef.current.parentElement!.clientHeight) * 100;

    // Clamp percentage between 25 and 75 percent

    setSeparator(percentage > 75 ? 75 : percentage < 25 ? 25 : percentage);
  }

  return (
    <RequestBuilderWrapper
      data-testid="requestBuilder"
      onMouseUp={() => setDraggingSeparator(false)}
      onMouseMove={handleMouseMove}
    >
      <UrlBar />
      <HorizontalDivision>
        <Tabs indicatorColor="secondary" value={tabIndex} onChange={(_, num) => setTabIndex(num)}>
          <Tab label="Params" href="params" LinkComponent={MuiLink} />
          <Tab label="Body" href="body" LinkComponent={MuiLink} />
          <Tab label="Headers" href="headers" LinkComponent={MuiLink} />
        </Tabs>
      </HorizontalDivision>
      <Box flex="1" position="relative">
        <Split direction="vertical" style={{ height: "100%" }}>
          <BodyBuilder height={100} />
          <RequestResponse height={100} />
        </Split>
      </Box>
    </RequestBuilderWrapper>
  );
}
