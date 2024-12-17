import { Box } from "@mui/material";
import Sidebar from "../Sidebar";
import WorkspaceSidebar, { WorkspaceTab } from "./workspaceSidebar";
import { useState } from "react";
import History from "./History";

export default function WorkspaceEditor() {
  const [currentTab, setCurrentTab] = useState<WorkspaceTab>(WorkspaceTab.Collections);

  return (
    <Box display="flex" flexDirection="row" height="100%">
      <WorkspaceSidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {GetWorkspaceTab(currentTab)}
    </Box>
  );
}

function GetWorkspaceTab(tab: WorkspaceTab) {
  switch (tab) {
    case WorkspaceTab.Collections:
      return <h1>Collections</h1>;
    case WorkspaceTab.Environment:
      return <h1>Environment</h1>;
    case WorkspaceTab.SavedRequests:
      return <h1>Saved Requests</h1>;
    case WorkspaceTab.History:
      return <History />;
  }
}
