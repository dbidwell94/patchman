import {
  Box,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Input,
  IconButton,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import { nanoid } from "nanoid";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import { Preview } from "@mui/icons-material";

const TableInput = styled(Input)`
  &::before {
    border: none;
  }
`;

const ParamsBuilderWrapper = styled(Box)`
  padding: 0.5rem 1rem;
`;

interface IQueryParam {
  id: string;
  key: string;
  value: string;
}

export default function ParamsBuilder() {
  const [params, setParams] = useState<IQueryParam[]>([]);

  const [paramToAdd, setParamToAdd] = useState<
    Partial<Omit<IQueryParam, "id">>
  >({});

  function editQueryParam(param: IQueryParam) {
    return (evt: React.ChangeEvent<HTMLInputElement>) => {
      evt.preventDefault();
      const { id: editedId } = param;
      const { name, value } = evt.target;

      setParams((prev) => {
        return prev.map((p) => {
          if (p.id !== editedId) return p;
          return { ...p, [name]: value };
        });
      });
    };
  }

  function addQueryParam(param: Omit<IQueryParam, "id">) {
    setParams((prev) => [...prev, { ...param, id: nanoid() }]);
  }

  function deleteQueryParam(param: IQueryParam) {
    return (evt: React.MouseEvent<HTMLButtonElement>) => {
      evt.preventDefault();
      setParams((prev) => {
        return prev.filter((p) => p.id !== param.id);
      });
    };
  }

  return (
    <ParamsBuilderWrapper>
      <TableContainer component={Paper}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography>KEY</Typography>
              </TableCell>
              <TableCell>
                <Typography>VALUE</Typography>
              </TableCell>
              <TableCell>
                <Typography>OPTIONS</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody data-testid="paramsTable">
            {params.map((param) => {
              return (
                <TableRow key={param.id}>
                  <TableCell>
                    <TableInput
                      size="small"
                      value={param.key}
                      name="key"
                      fullWidth
                      onChange={editQueryParam(param)}
                    />
                  </TableCell>
                  <TableCell>
                    <TableInput
                      size="small"
                      value={param.value}
                      fullWidth
                      name="value"
                      onChange={editQueryParam(param)}
                    />
                  </TableCell>
                  <TableCell>
                    {/** Delete Button */}
                    <Tooltip title="Delete Parameter">
                      <IconButton
                        color="error"
                        onClick={deleteQueryParam(param)}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow
              onBlur={() => {
                if (!paramToAdd.key || !paramToAdd.value) return;
                addQueryParam({ key: paramToAdd.key, value: paramToAdd.value });
                setParamToAdd({});
              }}
            >
              <TableCell>
                <TableInput
                  placeholder="newKey"
                  value={paramToAdd.key || ""}
                  onChange={(e) => {
                    setParamToAdd((prev) => {
                      return { ...prev, key: e.target.value };
                    });
                  }}
                />
              </TableCell>
              <TableCell>
                <TableInput
                  placeholder="newValue"
                  value={paramToAdd.value || ""}
                  onChange={(e) => {
                    setParamToAdd((prev) => {
                      return { ...prev, value: e.target.value };
                    });
                  }}
                />
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </ParamsBuilderWrapper>
  );
}
