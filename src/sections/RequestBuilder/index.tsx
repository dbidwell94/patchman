import { Box, styled, Paper, SvgIcon, Tab, Tabs } from "@mui/material";
import MoveIcon from "@mui/icons-material/MoreHoriz";
import BodyBuilder from "./BodyBuilder";
import UrlBar from "./urlBar";
import RequestResponse from "./requestResponse";
import React, { useEffect, useRef, useState } from "react";
import MuiLink from "@/components/MuiLink";
import { useAppPreferences } from "@/hooks/usePreferences";

const RequestBuilderWrapper = styled(Box)`
  flex-direction: column;
  height: 100%;
  display: flex;
`;

const SeperatorBar = styled(Paper)`
  width: 100%;
  height: 0.5rem;
  position: absolute;
  transform: translate(0%, -50%);
  opacity: 0.25;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.125s ease-in-out opacity, 0.125s ease-in-out height;
  overflow: hidden;
  cursor: ns-resize;
  &:hover {
    opacity: 1;
    height: 1rem;
  }
`;

const TabWrapper = styled(Box)`
  border-bottom: thin solid ${({ theme }) => theme.palette.grey[900]};
  padding: 0 1rem;
  width: 100%;
`;

export default function RequestBuilder() {
  const [preferences, setPreferences] = useAppPreferences();
  const [seperator, setSeperator] = useState(
    preferences.bodyBuilderSeperatorLocation
  );
  const [draggingSeperator, setDraggingSeperator] = useState(false);
  const [tabIndex, setTabIndex] = useState(preferences.requestBuilderTabIndex);

  const seperatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPreferences((prev) => ({
      ...prev,
      bodyBuilderSeperatorLocation: seperator,
    }));
  }, [seperator]);

  useEffect(() => {
    setPreferences((prev) => ({ ...prev, requestBuilderTabIndex: tabIndex }));
  }, [tabIndex]);

  function handleMouseMove(evt: React.MouseEvent<HTMLDivElement>): void {
    if (!draggingSeperator || !seperatorRef.current) return;
    evt.preventDefault();

    const yInput = evt.pageY;

    const pageUpperY = Math.max(
      evt.pageY,
      seperatorRef.current.parentElement!.offsetTop
    );
    const pageLowerY =
      seperatorRef.current.parentElement!.clientHeight +
      seperatorRef.current.parentElement!.offsetTop;

    // Clamp y input between upper and lower bounds of container
    // and subtract offsetTop
    const clampY =
      (yInput > pageLowerY
        ? pageLowerY
        : yInput < pageUpperY
        ? pageUpperY
        : yInput) - seperatorRef.current.parentElement!.offsetTop;

    const percentage =
      (clampY / seperatorRef.current.parentElement!.clientHeight) * 100;

    // Clamp percentage between 25 and 75 percent

    setSeperator(percentage > 75 ? 75 : percentage < 25 ? 25 : percentage);
  }

  return (
    <RequestBuilderWrapper
      data-testid="requestBuilder"
      onMouseUp={() => setDraggingSeperator(false)}
      onMouseMove={handleMouseMove}
    >
      <UrlBar />
      <TabWrapper>
        <Tabs
          indicatorColor="secondary"
          value={tabIndex}
          onChange={(_, num) => setTabIndex(num)}
        >
          <Tab label="Params" href="params" LinkComponent={MuiLink} />
          <Tab label="Body" href="body" LinkComponent={MuiLink} />
          <Tab label="Headers" href="headers" LinkComponent={MuiLink} />
          <Tab label="Authorization" href="auth" LinkComponent={MuiLink} />
        </Tabs>
      </TabWrapper>
      <Box flex="1" position="relative">
        <BodyBuilder height={seperator} />
        <SeperatorBar
          elevation={24}
          onMouseDown={() => setDraggingSeperator(true)}
          ref={seperatorRef}
        >
          <SvgIcon>
            <MoveIcon />
          </SvgIcon>
        </SeperatorBar>
        <RequestResponse height={100 - seperator} />
      </Box>
    </RequestBuilderWrapper>
  );
}
