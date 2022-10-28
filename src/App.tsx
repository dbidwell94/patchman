import { Box, styled } from "@mui/material";
import Sidebar from "@/components/Sidebar";
import PageSections from "@/sections";
import RequestBodyProvider from "./hooks/useRequestBody";
import PreferencesProvider from "./hooks/usePreferences";

const AppWrapper = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
`;

export default function App() {
  return (
      <RequestBodyProvider>
        <PreferencesProvider>
          <AppWrapper>
            <Sidebar />
            <PageSections />
          </AppWrapper>
        </PreferencesProvider>
      </RequestBodyProvider>
  );
}
