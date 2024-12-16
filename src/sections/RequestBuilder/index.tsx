import { useState, useRef, useEffect } from "react";
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
  const [preferences] = useAppPreferences();
  const [tabIndex, setTabIndex] = useState(preferences.requestBuilderTabIndex);

  return (
    <RequestBuilderWrapper data-testid="requestBuilder">
      <UrlBar />
      <HorizontalDivision>
        <Tabs indicatorColor="secondary" value={tabIndex} onChange={(_, num) => setTabIndex(num)}>
          <Tab label="Params" href="params" LinkComponent={MuiLink} />
          <Tab label="Body" href="body" LinkComponent={MuiLink} />
          <Tab label="Headers" href="headers" LinkComponent={MuiLink} />
        </Tabs>
      </HorizontalDivision>
      <Box flex="1">
        <Split direction="vertical" style={{ height: "100%" }}>
          <BodyBuilder height={100} />
          <RequestResponse height={100} />
        </Split>
      </Box>
    </RequestBuilderWrapper>
  );
}
