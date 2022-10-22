import RequestBuilder from "@/sections/RequestBuilder";
import { Box, styled } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";

const PageSectionsWrapper = styled(Box)`
  flex: 1;
`;

export default function PageSections() {
  return (
    <PageSectionsWrapper>
      <Routes>
        <Route path="/rest/*" element={<RequestBuilder />} />

        <Route path="/" element={<Navigate to="/rest" />} />
      </Routes>
    </PageSectionsWrapper>
  );
}
