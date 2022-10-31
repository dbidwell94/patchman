import { Box, styled, Tab, Tabs } from "@mui/material";
import Network from "@mui/icons-material/Link";
import Settings from "@mui/icons-material/Settings";
import MuiLink from "@/components/MuiLink";
import { useState } from "preact/hooks";

const SidebarWrapper = styled(Box)`
  min-height: 100%;
  border-right: thin solid ${({ theme }) => theme.palette.grey[900]};
`;

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState(0);

  function onTabChanged(_: any, newValue: number) {
    setActiveTab(newValue);
  }

  return (
    <SidebarWrapper>
      <Tabs orientation="vertical" indicatorColor="secondary" value={activeTab} onChange={onTabChanged}>
        <Tab label="Rest API" icon={<Network />} href="/rest" LinkComponent={MuiLink} />
        <Tab label="Settings" icon={<Settings />} LinkComponent={MuiLink} href="/settings" />
      </Tabs>
    </SidebarWrapper>
  );
}
