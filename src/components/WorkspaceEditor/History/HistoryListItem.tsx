import { HistoryState, RequestHistory, useDeleteHistoryItem } from "@/hooks/useRequestHistory";
import { Box, IconButton, ListItemButton, Tooltip, Typography } from "@mui/material";
import { useMemo } from "react";
import Trash from "@mui/icons-material/DeleteOutline";
import { useRequestBody } from "@/hooks/useRequestBody";
import { useResponseBody } from "@/hooks/useResponseBody";
import { useTranslation } from "react-i18next";

type HistoryListItemProps = {
  historyItem: HistoryState[number];
};

export default function HistoryListItem({ historyItem }: HistoryListItemProps) {
  const [[, setRequestBody]] = useRequestBody();
  const [, setResponseBody] = useResponseBody();
  const deleteHistoryItem = useDeleteHistoryItem();
  const [t] = useTranslation();
  const responseStatus = useMemo(() => {
    const item = historyItem.history[2];
    if ("Err" in item) {
      return item.Err.status;
    }
    return item.Ok.status;
  }, [historyItem.history[2]]);

  function colorResponseStatus(status: number) {
    if (status >= 200 && status < 300) return "success";
    if (status >= 300 && status < 400) return "warning";
    if (status >= 400) return "error";
    return;
  }

  function setRequestAndResponse(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
    setRequestBody(historyItem.history[0]);

    if ("Ok" in historyItem.history[2]) {
      setResponseBody(historyItem.history[2].Ok);
    } else {
      setResponseBody({
        body: null,
        headers: {},
        url: historyItem.history[2].Err.url,
        status: historyItem.history[2].Err.status,
        requestTimeMs: historyItem.history[2].Err.requestTimeMs,
      });
    }
  }

  return (
    <ListItemButton onClick={setRequestAndResponse}>
      <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" width="100%">
        <Box display="flex" flexDirection="row" alignItems="center">
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Typography variant="body2">{historyItem.history[0].method}</Typography>
            <Typography variant="body2" color={colorResponseStatus(responseStatus)}>
              {responseStatus}
            </Typography>
          </Box>

          <Typography variant="caption" paddingLeft={2}>
            {historyItem.history[0].url}
          </Typography>
        </Box>

        <Tooltip title={t("delete")} placement="left">
          <IconButton
            color="error"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              deleteHistoryItem(historyItem.index);
            }}
          >
            <Trash />
          </IconButton>
        </Tooltip>
      </Box>
    </ListItemButton>
  );
}
