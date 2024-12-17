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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const ParamsBuilderWrapper = styled(Box)`
  padding: 0.5rem 1rem;
  overflow: hidden;

  th.capitalize {
    text-transform: capitalize;
  }
`;

const TableInput = styled(Input)`
  &::before {
    border: none;
  }
`;

interface TableValue {
  key: string;
  value: string;
}

export interface KeyedTableValue extends TableValue {
  id: string;
}

interface ITableInputProps {
  items: KeyedTableValue[];
  onDelete: (item: KeyedTableValue) => void;
  onAdded: (item: KeyedTableValue) => void;
  editItem: (newItemValue: KeyedTableValue) => void;
  readonly?: boolean;
}

export function useKeyValueTableInputState(initialState: KeyedTableValue[]) {
  const [items, setItems] = useState(initialState);

  function editItem(item: KeyedTableValue) {
    setItems((prev) => {
      return prev.map((i) => {
        if (i.id !== item.id) return i;
        return item;
      });
    });
  }

  function addItem(item: KeyedTableValue) {
    setItems((prev) => [...prev, item]);
  }

  function deleteItem(item: KeyedTableValue) {
    setItems((prev) => {
      return prev.filter((i) => i.id !== item.id);
    });
  }

  return { items, editItem, addItem, deleteItem, setItems };
}

export default function KeyValueTableInput(props: ITableInputProps) {
  const { items, onDelete, editItem, onAdded, readonly } = props;
  const [itemToAdd, setItemToAdd] = useState<Partial<Omit<KeyedTableValue, "id">>>({});
  const [t] = useTranslation();

  return (
    <ParamsBuilderWrapper>
      <TableContainer component={Paper} sx={{ height: "100%" }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell className="capitalize" width={"33%"}>
                {t("keyValueTable.key")}
              </TableCell>
              <TableCell className="capitalize" width={"33%"}>
                {t("keyValueTable.value")}
              </TableCell>
              {!readonly && (
                <TableCell className="capitalize" width={"33%"}>
                  {t("keyValueTable.options")}
                </TableCell>
              )}
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
                          editItem({ ...item, key: evt?.currentTarget.value });
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
                          editItem({ ...item, value: evt?.currentTarget.value });
                        }}
                      />
                    )}
                  </TableCell>
                  {!readonly && (
                    <TableCell width={"33%"}>
                      {/** Delete Button */}
                      <Tooltip title={t("delete")}>
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
                    placeholder={t("keyValueTable.newKey")}
                    size={"small"}
                    className="capitalize"
                    value={itemToAdd.key || ""}
                    onChange={(e) => {
                      console.log(e);
                      setItemToAdd((prev) => {
                        return { ...prev, key: e?.target.value };
                      });
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TableInput
                    placeholder={t("keyValueTable.newValue")}
                    value={itemToAdd.value || ""}
                    size={"small"}
                    onChange={(e) => {
                      setItemToAdd((prev) => {
                        return { ...prev, value: e?.target.value };
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
