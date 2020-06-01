import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../modules/reducer";
import {
  getMonthlyItems,
  getTotalyItems,
  sumAllSaved,
  itemsInit,
  purchasedItem,
  purchasedList,
  deletedItem,
  deletedList,
  deleteMultiItems,
  getMonthly,
} from "../modules/items";

import { useCallback } from "react";

export default function useItems() {
  const items_monthly = useSelector(
    (state: RootState) => state.items.items_monthly,
  );
  const monthlySaved = useSelector(
    (state: RootState) => state.items.mothlySaved,
  );
  const items_total = useSelector(
    (state: RootState) => state.items.items_total,
  );

  const dispatch = useDispatch();

  const getMonthlyItem = useCallback(
    (items: any) => {
      dispatch(getMonthlyItems(items));
    },
    [dispatch],
  );
  const getTotalyItem = useCallback(
    (items) => {
      dispatch(getTotalyItems(items));
    },
    [dispatch],
  );
  const SumAllMonthly = useCallback(() => {
    dispatch(sumAllSaved());
  }, [dispatch]);
  const itemStoreInit = useCallback(() => {
    dispatch(itemsInit());
  }, [dispatch]);
  const purchaseItem = useCallback(
    (item_id) => {
      dispatch(purchasedItem(item_id));
    },
    [dispatch],
  );
  const purchaseList = useCallback(
    (item_id) => {
      dispatch(purchasedList(item_id));
    },
    [dispatch],
  );
  const deleteItem = useCallback(
    (item_id) => {
      dispatch(deletedItem(item_id));
    },
    [dispatch],
  );
  const deleteList = useCallback(
    (item_id) => {
      dispatch(deletedList(item_id));
    },
    [dispatch],
  );
  const multiDelete = useCallback(
    (deleteItems) => {
      dispatch(deleteMultiItems(deleteItems));
    },
    [dispatch],
  );
  const getMonthly_list = useCallback(
    (user_id) => {
      dispatch(getMonthly(user_id));
    },
    [dispatch],
  );

  return {
    items_total,
    itemStoreInit,
    items_monthly,
    getMonthlyItem,
    getTotalyItem,
    monthlySaved,
    SumAllMonthly,
    purchaseItem,
    purchaseList,
    deleteList,
    deleteItem,
    multiDelete,
    getMonthly_list,
  };
}
