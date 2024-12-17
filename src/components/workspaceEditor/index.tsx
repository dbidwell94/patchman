import { Box } from "@mui/material";
import Sidebar from "../Sidebar";
import WorkspaceSidebar from "./workspaceSidebar";

export default function WorkspaceEditor() {
  return (
    <Box display="flex" flexDirection="row" height="100%">
      <WorkspaceSidebar />
    </Box>
  );
}
