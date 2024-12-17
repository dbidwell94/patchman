import { Box, styled, Tab, Tabs } from "@mui/material";
import Network from "@mui/icons-material/Link";
import Settings from "@mui/icons-material/Settings";
import MuiLink from "@/components/MuiLink";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const SidebarWrapper = styled(Box)`
  min-height: 100%;
  border-right: thin solid ${({ theme }) => theme.palette.grey[900]};
`;

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState(0);

  const [t] = useTranslation();

  function onTabChanged(_: any, newValue: number) {
    setActiveTab(newValue);
  }

  return (
    <SidebarWrapper>
      <Tabs orientation="vertical" indicatorColor="secondary" value={activeTab} onChange={onTabChanged}>
        <Tab label={t("restApi")} icon={<Network />} href="/rest" LinkComponent={MuiLink} />
        <Tab label={t("settings")} icon={<Settings />} LinkComponent={MuiLink} href="/settings" />
      </Tabs>
    </SidebarWrapper>
  );
}
