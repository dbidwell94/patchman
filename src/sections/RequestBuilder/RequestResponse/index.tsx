import { styled, Box, Tab, Tabs } from "@mui/material";
import HorizontalDivision from "@/components/HorizontalDivision";
import React, { useMemo, useRef, useState } from "react";
import ResponseBody from "@/sections/RequestBuilder/RequestResponse/ResponseBody";
import ResponseHeaders from "@/sections/RequestBuilder/RequestResponse/ResponseHeaders";

interface IRequestResponseProps {
  height: number;
}

const RequestResponseWrapper = styled(Box)`
  overflow-y: hidden;
`;

export default function Index(props: IRequestResponseProps) {
  const [tabIndex, setTabIndex] = useState(0);

  function getTabIndex() {
    switch (tabIndex) {
      case 0: {
        return <ResponseBody />;
      }
      case 1: {
        return <ResponseHeaders />;
      }
    }
  }

  return (
    <RequestResponseWrapper style={{ height: props.height + "%" }}>
      <HorizontalDivision>
        <Tabs
          indicatorColor="secondary"
          value={tabIndex}
          onChange={(_, num) => setTabIndex(num)}
          sx={{ height: "3rem" }}
        >
          <Tab label="Body" />
          <Tab label="Headers" />
        </Tabs>
      </HorizontalDivision>
      <div style={{ overflowY: "auto", width: "100%", height: "calc(100% - 3rem)" }}>{getTabIndex()}</div>
    </RequestResponseWrapper>
  );
}
