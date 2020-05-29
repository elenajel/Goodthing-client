export const ITEMS_GET = "MONTHLY_ITEMS_GET" as const;
export const ITEMS_GET_TOTAL = "ITEMS_GET_TOTAL" as const;
export const ITEMS_STORE_INIT = "ITEM_STORE_INIT" as const;
export const ITEMS_SUM_ALL_SAVED_MONTHLY_AMOUNT = "ITEMS_SUM_ALL_SAVED_MONTHLY_AMOUNT" as const;
export const ITEMS_PURCHASED = " ITEMS_PURCHASED" as const;
export const LIST_PURCHASED = "LIST_PURCHASED" as const;
export const ITEMS_DELETE = "ITEMS_DELETE" as const;
export const ITEMS_MULTI_DELETE = "ITEMS_MULTI_DELETE" as const;
export const LIST_DELETE = "LIST_DELETE" as const;

export const getMonthlyItems = (items: any) => ({
  type: ITEMS_GET,
  payload: items,
});

export const sumAllSaved = () => ({
  type: ITEMS_SUM_ALL_SAVED_MONTHLY_AMOUNT,
});
export const itemsInit = () => ({
  type: ITEMS_STORE_INIT,
});
export const purchasedItem = (item_id: number) => ({
  type: ITEMS_PURCHASED,
  payload: {
    item_id,
  },
});
export const purchasedList = (item_id: number) => ({
  type: LIST_PURCHASED,
  payload: {
    item_id,
  },
});
export const deletedItem = (item_id: number) => ({
  type: ITEMS_DELETE,
  payload: {
    item_id,
  },
});
export const deletedList = (item_id: number) => ({
  type: LIST_DELETE,
  payload: {
    item_id,
  },
});

export const getTotalyItems = (items: any) => ({
  type: ITEMS_GET_TOTAL,
  payload: items,
});
export const deleteMultiItems = (deletedItemList: any) => ({
  type: ITEMS_MULTI_DELETE,
  payload: { deletedItemList },
});

const initialItemState: any = {
  items_total: [],
  items_monthly: [],
  mothlySaved: 0,
};

type ItemsAction =
  | ReturnType<typeof getMonthlyItems>
  | ReturnType<typeof sumAllSaved>
  | ReturnType<typeof itemsInit>
  | ReturnType<typeof getTotalyItems>
  | ReturnType<typeof purchasedItem>
  | ReturnType<typeof purchasedList>
  | ReturnType<typeof deletedItem>
  | ReturnType<typeof deletedList>
  | ReturnType<typeof deleteMultiItems>;

const reducer = (state = initialItemState, action: ItemsAction) => {
  switch (action.type) {
    case ITEMS_GET:
      return {
        ...state,
        items_monthly: [...action.payload],
      };
    case ITEMS_GET_TOTAL:
      return {
        ...state,
        items_total: [...action.payload],
      };
    case ITEMS_SUM_ALL_SAVED_MONTHLY_AMOUNT:
      let mothlySaved = state.items_monthly.reduce(
        (acc: number, { item_price, purchased }: any) => {
          if (purchased === false) {
            return (acc += item_price);
          } else {
            return acc;
          }
        },
        0,
      );
      return { ...state, mothlySaved };
    case ITEMS_STORE_INIT:
      return { ...initialItemState };

    case ITEMS_PURCHASED:
      let items_monthly = state.items_monthly.map((item: any) =>
        item.id === action.payload.item_id
          ? { ...item, purchased: item.purchased === true ? false : true }
          : item,
      );
      return { ...state, items_monthly };

    case LIST_PURCHASED:
      let purchased_list = state.items_total.filter(
        (item: any) => item.id !== action.payload.item_id,
      );
      return { ...state, items_total: [...purchased_list] };

    case ITEMS_DELETE:
      let deleted_monthly = state.items_monthly.filter(
        (item: any) => item.id !== action.payload.item_id,
      );

      return { ...state, items_monthly: [...deleted_monthly] };
    case LIST_DELETE:
      let deleted_list = state.items_total.filter(
        (item: any) => item.id !== action.payload.item_id,
      );

      return { ...state, items_total: [...deleted_list] };
    case ITEMS_MULTI_DELETE:
      let items = state.items_total.filter(
        (item: any) => !(item.id + "" in action.payload.deletedItemList),
      );
      return { ...state, items_total: items };

    default:
      return state;
  }
};

export default reducer;
