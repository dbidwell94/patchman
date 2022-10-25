import MuiLink from "@/components/MuiLink";
import { Box, styled, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthBuilder from "./authBuilder";
import HeaderBuilder from "./headerBuilder";
import ParamsBuilder from "./paramsBuilder";
import RequestBodyBuilder from "./requestBodyBuilder";

interface IBodyBuilderProps {
  height: number;
}

export default function BodyBuilder(props: IBodyBuilderProps) {
  return (
    <Box data-testid="bodyBuilder" height={`${props.height}%`}>
      <Routes>
        <Route
          path="params"
          element={<ParamsBuilder />}
        />
        <Route path="body" element={<RequestBodyBuilder />} />
        <Route path="headers" element={<HeaderBuilder />} />
        <Route path="auth" element={<AuthBuilder />} />
        <Route path="" element={<Navigate to="params" />} />
      </Routes>
    </Box>
  );
}
