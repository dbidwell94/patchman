import { useAppPreferences } from "@/hooks/usePreferences";
import RequestBuilder from "@/sections/RequestBuilder";
import { Box, styled } from "@mui/material";
import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

const PageSectionsWrapper = styled(Box)`
  flex: 1;
`;

export default function PageSections() {
  const [_, setPreferences] = useAppPreferences();
  const location = useLocation();

  useEffect(() => {
    setPreferences((prev) => ({
      ...prev,
      urlHistory: [location.pathname, ...prev.urlHistory],
    }));
  }, [location.pathname]);

  return (
    <PageSectionsWrapper>
      <Routes>
        <Route path="/rest/*" element={<RequestBuilder />} />
        <Route path="/settings/*" element={<h1>Settings</h1>} />
        <Route path="/" element={<Navigate to="/rest" />} />
      </Routes>
    </PageSectionsWrapper>
  );
}
