import { Box, styled, Paper, SvgIcon, Tab, Tabs } from "@mui/material";
import MoveIcon from "@mui/icons-material/MoreHoriz";
import BodyBuilder from "./BodyBuilder";
import UrlBar from "./UrlBar";
import RequestResponse from "./RequestResponse";
import React, { useEffect, useRef, useState } from "react";
import MuiLink from "@/components/MuiLink";
import { useAppPreferences } from "@/hooks/usePreferences";
import HorizontalDivision from "@/components/HorizontalDivision";

const RequestBuilderWrapper = styled(Box)`
  flex-direction: column;
  height: 100%;
  display: flex;
`;

const SeparatorBar = styled(Paper)`
  width: 100%;
  height: 1rem;
  position: absolute;
  transform: translate(0%, -50%);
  opacity: 0.25;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.125s ease-in-out opacity;
  overflow: hidden;
  cursor: ns-resize;
  &:hover {
    opacity: 1;
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

  function handleMouseMove(evt: React.MouseEvent<HTMLDivElement>): void {
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
          <Tab label="Authorization" href="auth" LinkComponent={MuiLink} />
        </Tabs>
      </HorizontalDivision>
      <Box flex="1" position="relative">
        <BodyBuilder height={separator} />
        <SeparatorBar elevation={24} onMouseDown={() => setDraggingSeparator(true)} ref={separatorRef}>
          <SvgIcon>
            <MoveIcon />
          </SvgIcon>
        </SeparatorBar>
        <RequestResponse height={100 - separator} />
      </Box>
    </RequestBuilderWrapper>
  );
}
