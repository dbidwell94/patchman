import { Box, styled } from "@mui/material";
import Sidebar from "@/components/Sidebar";
import PageSections from "@/sections";
import RequestBodyProvider from "./hooks/useRequestBody";
import PreferencesProvider from "./hooks/usePreferences";
import ResponseBodyProvider from "@/hooks/useResponseBody";

import "prismjs/themes/prism-dark.min.css";
import Split from "react-split";
import WorkspaceEditor from "./components/workspaceEditor";

const AppWrapper = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;

  .horizontal-split {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    > .gutter {
      background-color: ${({ theme }) => theme.palette.grey["900"]};
      background-repeat: no-repeat;
      background-position: 50%;
      transition: 0.125s ease-in-out background-color;
      &:hover {
        background-color: ${({ theme }) => theme.palette.secondary.main};
      }
      cursor: ns-resize;
    }

    > .gutter.gutter-horizontal {
      cursor: col-resize;
    }
  }
`;

export default function App() {
  return (
    <RequestBodyProvider>
      <ResponseBodyProvider>
        <PreferencesProvider>
          <AppWrapper>
            <Split direction="horizontal" className="horizontal-split">
              {/* Sidebar and PageSections */}
              <Box flex="1" display={"flex"}>
                <Sidebar />
                <PageSections />
              </Box>

              {/* Workspace Editor */}
              <WorkspaceEditor />
            </Split>
          </AppWrapper>
        </PreferencesProvider>
      </ResponseBodyProvider>
    </RequestBodyProvider>
  );
}
