import { HistoryState, useRequestHistory } from "@/hooks/useRequestHistory";
import { Box, Collapse, List, ListItemButton, ListItemIcon, Typography } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import HistoryListItem from "./HistoryListItem";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import React from "react";

export default function History() {
  const history = useRequestHistory();
  const [, { language }] = useTranslation();

  const sortedHistoryByDate = useMemo<Record<string, HistoryState>>(() => {
    const sortedHistory: Record<string, HistoryState> = {};
    history.forEach((item) => {
      const date = new Date(item.history[1]);
      const key = date.toLocaleDateString(language, { dateStyle: "long" });
      if (!sortedHistory[key]) {
        sortedHistory[key] = [];
      }
      sortedHistory[key].push(item);
    });
    return sortedHistory;
  }, [history, language]);

  const [openedDate, setOpenedDate] = useState<string | null>(null);

  return (
    <Box display="flex" flexDirection="column" height="100%" width="100%">
      <List sx={{ width: "100%" }}>
        {Object.entries(sortedHistoryByDate).map(([date, history]) => {
          return (
            <React.Fragment key={date}>
              <ListItemButton
                onClick={() => setOpenedDate((prev) => (prev === date ? null : date))}
                sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
                disableGutters
                divider
                selected={openedDate === date}
              >
                <Typography variant="body2">{date}</Typography>
                {openedDate === date ? (
                  <ListItemIcon>
                    <ExpandLess />
                  </ListItemIcon>
                ) : (
                  <ListItemIcon>
                    <ExpandMore />
                  </ListItemIcon>
                )}
              </ListItemButton>
              <Collapse key={date} unmountOnExit in={openedDate === date}>
                <List>
                  {history.map((item) => (
                    <HistoryListItem key={`${item.history[0].url}${item.history[0].method}`} historyItem={item} />
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          );
        })}
      </List>
    </Box>
  );
}
