import {
  Box,
  IconButton,
  Input,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import React, { useState } from "react";
import { nanoid } from "nanoid";

const ParamsBuilderWrapper = styled(Box)`
  padding: 0.5rem 1rem;
  overflow: hidden;
`;

const TableInput = styled(Input)`
  &::before {
    border: none;
  }
`;

interface ITableValue {
  key: string;
  value: string;
}

export interface IKeyedTableValue extends ITableValue {
  id: string;
}

interface ITableInputProps {
  items: IKeyedTableValue[];
  onDelete: (item: IKeyedTableValue) => void;
  onAdded: (item: IKeyedTableValue) => void;
  editItem: (newItemValue: IKeyedTableValue) => void;
  readonly?: boolean;
}

export function useKeyValueTableInputState(initialState: IKeyedTableValue[]) {
  const [items, setItems] = useState(initialState);

  function editItem(item: IKeyedTableValue) {
    setItems((prev) => {
      return prev.map((i) => {
        if (i.id !== item.id) return i;
        return item;
      });
    });
  }

  function addItem(item: IKeyedTableValue) {
    setItems((prev) => [...prev, item]);
  }

  function deleteItem(item: IKeyedTableValue) {
    setItems((prev) => {
      return prev.filter((i) => i.id !== item.id);
    });
  }

  return { items, editItem, addItem, deleteItem, setItems };
}

export default function KeyValueTableInput(props: ITableInputProps) {
  const { items, onDelete, editItem, onAdded, readonly } = props;

  const [itemToAdd, setItemToAdd] = useState<Partial<Omit<IKeyedTableValue, "id">>>({});

  return (
    <ParamsBuilderWrapper>
      <TableContainer component={Paper} sx={{ height: "100%" }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell width={"33%"}>KEY</TableCell>
              <TableCell width={"33%"}>VALUE</TableCell>
              {!readonly && <TableCell width={"33%"}>OPTIONS</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody data-testid="paramsTable">
            {items.map((item) => {
              return (
                <TableRow key={item.id} hover>
                  <TableCell width={"33%"} style={{ wordBreak: "break-all" }}>
                    {readonly ? (
                      <>{item.key}</>
                    ) : (
                      <TableInput
                        size="small"
                        value={item.key}
                        name="key"
                        fullWidth
                        onChange={(evt) => {
                          editItem({ ...item, key: evt.target.value });
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell width={"33%"} style={{ wordBreak: "break-all" }}>
                    {readonly ? (
                      <>{item.value}</>
                    ) : (
                      <TableInput
                        size="small"
                        value={item.value}
                        fullWidth
                        disabled={readonly}
                        name="value"
                        onChange={(evt) => {
                          editItem({ ...item, value: evt.target.value });
                        }}
                      />
                    )}
                  </TableCell>
                  {!readonly && (
                    <TableCell width={"33%"}>
                      {/** Delete Button */}
                      <Tooltip title="Delete Parameter">
                        <IconButton
                          color="error"
                          onClick={() => {
                            onDelete(item);
                          }}
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
            {!readonly && (
              <TableRow
                onBlur={() => {
                  if (!itemToAdd.key || !itemToAdd.value) return;
                  onAdded({ key: itemToAdd.key, value: itemToAdd.value, id: nanoid() });
                  setItemToAdd({});
                }}
              >
                <TableCell>
                  <TableInput
                    placeholder="newKey"
                    size={"small"}
                    value={itemToAdd.key || ""}
                    onChange={(e) => {
                      setItemToAdd((prev) => {
                        return { ...prev, key: e.target.value };
                      });
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TableInput
                    placeholder="newValue"
                    value={itemToAdd.value || ""}
                    size={"small"}
                    onChange={(e) => {
                      setItemToAdd((prev) => {
                        return { ...prev, value: e.target.value };
                      });
                    }}
                  />
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </ParamsBuilderWrapper>
  );
}
