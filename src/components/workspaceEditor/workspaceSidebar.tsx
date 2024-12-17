import { Box, styled, Tab, Tabs, Tooltip } from "@mui/material";
import Folder from "@mui/icons-material/Folder";
import Layers from "@mui/icons-material/Layers";
import Accesstime from "@mui/icons-material/AccessTime";
import Computer from "@mui/icons-material/Computer";
import { useTranslation } from "react-i18next";
import { useState } from "react";

enum WorkspaceTab {
  Collections,
  Environment,
  SavedRequests,
  History,
}

const BoxWrapper = styled(Box)`
  border-right: 1px solid ${({ theme }) => theme.palette.divider};
`;

export default function WorkspaceSidebar() {
  const [currentTab, setCurrentTab] = useState(WorkspaceTab.Collections);

  const [t] = useTranslation();
  return (
    <BoxWrapper>
      <Tabs
        orientation="vertical"
        value={currentTab}
        onChange={(_, tab) => setCurrentTab(tab)}
        indicatorColor="secondary"
      >
        <Tooltip title={t("workspaceEditor.collections")} placement="left">
          <Tab icon={<Folder />} tabIndex={WorkspaceTab.Collections} />
        </Tooltip>

        <Tooltip title={t("workspaceEditor.environment")} placement="left">
          <Tab icon={<Layers />} tabIndex={WorkspaceTab.Environment} />
        </Tooltip>

        <Tooltip title={t("workspaceEditor.savedRequests")} placement="left">
          <Tab icon={<Computer />} tabIndex={WorkspaceTab.SavedRequests} />
        </Tooltip>

        <Tooltip title={t("workspaceEditor.history")} placement="left">
          <Tab icon={<Accesstime />} tabIndex={WorkspaceTab.History} />
        </Tooltip>
      </Tabs>
    </BoxWrapper>
  );
}
