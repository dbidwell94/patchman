import { RequestHistory } from "@/hooks/useRequestHistory";
import { Box, Button, IconButton, ListItemButton, Typography } from "@mui/material";
import { useMemo } from "react";
import Trash from "@mui/icons-material/DeleteOutline";
import { useRequestBody } from "@/hooks/useRequestBody";
import { useResponseBody } from "@/hooks/useResponseBody";

type HistoryListItemProps = {
  historyItem: RequestHistory[number];
};

export default function HistoryListItem({ historyItem }: HistoryListItemProps) {
  const [[, setRequestBody]] = useRequestBody();
  const [, setResponseBody] = useResponseBody();
  const responseStatus = useMemo(() => {
    const item = historyItem[2];
    if ("Err" in item) {
      return item.Err.status;
    }
    return item.Ok.status;
  }, [historyItem[2]]);

  function colorResponseStatus(status: number) {
    if (status >= 200 && status < 300) return "success";
    if (status >= 300 && status < 400) return "warning";
    if (status >= 400) return "error";
    return;
  }

  function setRequestAndResponse(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
    setRequestBody(historyItem[0]);

    if ("Ok" in historyItem[2]) {
      setResponseBody(historyItem[2].Ok);
    } else {
      setResponseBody({
        body: null,
        headers: {},
        url: historyItem[2].Err.url,
        status: historyItem[2].Err.status,
        requestTimeMs: historyItem[2].Err.requestTimeMs,
      });
    }
  }

  return (
    <ListItemButton onClick={setRequestAndResponse}>
      <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" width="100%">
        <Box display="flex" flexDirection="row" alignItems="center">
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Typography variant="body2">{historyItem[0].method}</Typography>
            <Typography variant="body2" color={colorResponseStatus(responseStatus)}>
              {responseStatus}
            </Typography>
          </Box>

          <Typography variant="caption" paddingLeft={2}>
            {historyItem[0].url}
          </Typography>
        </Box>

        <IconButton color="error">
          <Trash />
        </IconButton>
      </Box>
    </ListItemButton>
  );
}
