import MuiLink from "@/components/MuiLink";
import { Box, styled, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthBuilder from "./authBuilder";
import HeaderBuilder from "./headerBuilder";
import ParamsBuilder from "./paramsBuilder";
import RequestBodyBuilder from "./requestBodyBuilder";

const TabWrapper = styled(Box)`
  border-bottom: thin solid ${({ theme }) => theme.palette.grey[900]};
  padding: 0 1rem;
  width: 100%;
`;

interface IBodyBuilderProps {
  height: number;
}

export default function BodyBuilder(props: IBodyBuilderProps) {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Box data-testid="bodyBuilder" overflow="hidden">
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
      <Routes>
        <Route
          path="params"
          element={<ParamsBuilder height={props.height - 20} />}
        />
        <Route path="body" element={<RequestBodyBuilder />} />
        <Route path="headers" element={<HeaderBuilder />} />
        <Route path="auth" element={<AuthBuilder />} />
        <Route path="" element={<Navigate to="params" />} />
      </Routes>
    </Box>
  );
}
