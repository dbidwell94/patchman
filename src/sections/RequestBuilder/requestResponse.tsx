import { styled, Box, Tab, Tabs } from "@mui/material";
import HorizontalDivision from "@/components/HorizontalDivision";
import MuiLink from "@/components/MuiLink";
import React, { useState } from "react";

interface IRequestResponseProps {
  height: number;
}

const RequestResponseWrapper = styled(Box)``;

export default function RequestResponse(props: IRequestResponseProps) {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <RequestResponseWrapper height={`${props.height}%`}>
      <HorizontalDivision>
        <Tabs indicatorColor="secondary" value={tabIndex} onChange={(_, num) => setTabIndex(num)}>
          <Tab label="Body" />
          <Tab label="Headers" />
        </Tabs>
      </HorizontalDivision>
    </RequestResponseWrapper>
  );
}
