import { useAppPreferences } from "@/hooks/usePreferences";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import AuthBuilder from "./authBuilder";
import HeaderBuilder from "./headerBuilder";
import ParamsBuilder from "./paramsBuilder";
import RequestBodyBuilder from "./requestBodyBuilder";

interface IBodyBuilderProps {
  height: number;
}

export default function BodyBuilder(props: IBodyBuilderProps) {
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
    <Box data-testid="bodyBuilder" height={`${props.height}%`}>
      <Routes>
        <Route path="params" element={<ParamsBuilder />} />
        <Route path="body" element={<RequestBodyBuilder />} />
        <Route path="headers" element={<HeaderBuilder />} />
        <Route path="auth" element={<AuthBuilder />} />
        <Route path="" element={<Navigate to="params" />} />
      </Routes>
    </Box>
  );
}
