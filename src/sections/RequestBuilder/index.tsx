import { Box, styled, Paper, SvgIcon } from "@mui/material";
import MoveIcon from "@mui/icons-material/MoreHoriz";
import BodyBuilder from "./BodyBuilder";
import UrlBar from "./urlBar";
import RequestResponse from "./requestResponse";
import React, { useRef, useState } from "react";

const RequestBuilderWrapper = styled(Box)`
  flex-direction: column;
  height: 100%;
  display: flex;
`;

const SeperatorBar = styled(Paper)<{ top: string }>`
  width: 100%;
  height: 0.5rem;
  position: absolute;
  transform: translate(0%, -50%);
  opacity: 0.25;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.125s ease-in-out opacity, 0.125s ease-in-out height;
  top: ${({ top }) => top};
  cursor: ns-resize;
  &:hover {
    opacity: 1;
    height: 1rem;
  }
`;

interface IRequestContext {
  url: string;
  params: Record<string, string>;
  headers: Record<string, number | string>;
}

export default function RequestBuilder() {
  const [seperator, setSeperator] = useState(25);
  const [draggingSeperator, setDraggingSeperator] = useState(false);

  const seperatorRef = useRef(null);

  function handleMouseMove(evt: React.MouseEvent<HTMLDivElement>): void {
    if (!draggingSeperator) return;
    evt.preventDefault();
    console.log(evt.pageY);
  }

  return (
    <RequestBuilderWrapper
      data-testid="requestBuilder"
      onMouseUp={() => setDraggingSeperator(false)}
      onMouseMove={handleMouseMove}
    >
      <UrlBar />
      <Box flex="1" position="relative">
        <BodyBuilder height={seperator} />
        <SeperatorBar
          top={`${seperator}%`}
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
