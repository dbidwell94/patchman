import { Box, styled } from "@mui/material";
import Sidebar from "@/components/Sidebar";
import PageSections from "@/sections";
import RequestBodyProvider from "./hooks/useRequestBody";
import PreferencesProvider from "./hooks/usePreferences";
import "prismjs/themes/prism-dark.min.css";
import ResponseBodyProvider from "@/hooks/useResponseBody";

const AppWrapper = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
`;

export default function App() {
  return (
    <RequestBodyProvider>
      <ResponseBodyProvider>
        <PreferencesProvider>
          <AppWrapper>
            <Sidebar />
            <PageSections />
          </AppWrapper>
        </PreferencesProvider>
      </ResponseBodyProvider>
    </RequestBodyProvider>
  );
}
