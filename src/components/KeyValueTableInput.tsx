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
  overflow-y: auto;
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
  const { items, onDelete, editItem, onAdded } = props;

  const [itemToAdd, setItemToAdd] = useState<Partial<Omit<IKeyedTableValue, "id">>>({});

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
            {items.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <TableInput
                      size="small"
                      value={item.key}
                      name="key"
                      fullWidth
                      onChange={(evt) => {
                        editItem({ ...item, key: evt.target.value });
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <TableInput
                      size="small"
                      value={item.value}
                      fullWidth
                      name="value"
                      onChange={(evt) => {
                        editItem({ ...item, value: evt.target.value });
                      }}
                    />
                  </TableCell>
                  <TableCell>
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
                </TableRow>
              );
            })}
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
                  onChange={(e) => {
                    setItemToAdd((prev) => {
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
