import { Box, styled } from "@mui/material";
import Sidebar from "@/components/Sidebar";
import PageSections from "@/sections";
import "prismjs/themes/prism-dark.min.css";

const AppWrapper = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
`;

export default function App() {
  return (
    <AppWrapper>
      <Sidebar />
      <PageSections />
    </AppWrapper>
  );
}
