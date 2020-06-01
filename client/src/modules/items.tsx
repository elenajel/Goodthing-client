import axios from "axios";

//! 디렉토리 구조는 ducks pattern 사용했습니다
export const ITEMS_GET = "MONTHLY_ITEMS_GET" as const;
export const ITEMS_GET_TOTAL = "ITEMS_GET_TOTAL" as const;
export const ITEMS_STORE_INIT = "ITEM_STORE_INIT" as const;
export const ITEMS_SUM_ALL_SAVED_MONTHLY_AMOUNT = "ITEMS_SUM_ALL_SAVED_MONTHLY_AMOUNT" as const;
export const ITEMS_PURCHASED = " ITEMS_PURCHASED" as const;
export const LIST_PURCHASED = "LIST_PURCHASED" as const;
export const ITEMS_DELETE = "ITEMS_DELETE" as const;
export const ITEMS_MULTI_DELETE = "ITEMS_MULTI_DELETE" as const;
export const LIST_DELETE = "LIST_DELETE" as const;

//! 편의상 API도 일단 한 파일에 다 넣어놓았지만 마찬가지로 API 폴더에 따로 분류해야 합니다.
const getMonthlyAPI = (user_id: number) => {
  return axios.get(
    `http://18.217.232.233:8080/monthly_list?user_id=${user_id}`,
  );
};
const getTotalyAPI = (user_id: number) => {
  return axios.get(`http://18.217.232.233:8080/total_list?user_id=${user_id}`);
};

//! 이 부분이 thunk로 작성한 미들웨어 보시다 싶히 순수 액션 객체를 리턴하는 형태가 아닌
//! 액션 디스패쳐 함수를 리턴하는 형태 => 사가는 순수 액션 객체를 리턴
export const getMonthly = (user_id: number) => async (dispatch: any) => {
  try {
    let res = await getMonthlyAPI(user_id);
    dispatch({ type: ITEMS_GET, payload: res.data.monthly_list.items });
  } catch (err) {
    console.log(err);
  }
};

export const getTotaly = (user_id: number) => async (dispatch: any) => {
  try {
    let res = await getTotalyAPI(user_id);
    dispatch({ type: ITEMS_GET_TOTAL, payload: res.data.total_list.items });
  } catch (err) {
    console.log(err);
  }
};

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
