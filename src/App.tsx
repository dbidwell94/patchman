import { Box, styled } from "@mui/material";
import Sidebar from "@/components/Sidebar";
import { BrowserRouter as Router } from "react-router-dom";
import PageSections from "@/sections";

const AppWrapper = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
`;

export default function App() {
  return (
    <Router>
      <AppWrapper>
        <Sidebar />
        <PageSections />
      </AppWrapper>
    </Router>
  );
}
