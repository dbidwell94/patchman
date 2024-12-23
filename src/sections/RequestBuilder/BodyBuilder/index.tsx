import { useAppPreferences } from "@/hooks/usePreferences";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import HeaderBuilder from "./HeaderBuilder";
import ParamsBuilder from "./ParamsBuilder";
import RequestBodyBuilder from "./RequestBodyBuilder";

interface BodyBuilderProps {
  height: number;
}

export default function BodyBuilder(props: BodyBuilderProps) {
  const [preferences, _] = useAppPreferences();
  const navigate = useNavigate();

  // When mounting this page, go back to the previous URL that contains a /rest/*
  useEffect(() => {
    for (const url of preferences.urlHistory) {
      if (url.includes("/rest")) {
        navigate(url);
        return;
      }
    }
  }, []);

  return (
    <Box data-testid="bodyBuilder" style={{ height: props.height + "%" }}>
      <Routes>
        <Route path="params" element={<ParamsBuilder />} />
        <Route path="body" element={<RequestBodyBuilder />} />
        <Route path="headers" element={<HeaderBuilder />} />
        <Route path="" element={<Navigate to="params" />} />
      </Routes>
    </Box>
  );
}
