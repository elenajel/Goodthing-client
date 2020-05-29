const handleOrder = (items: any, orderBy: any) => {
  let orderValue = orderBy[0] === "latest" ? "id" : "item_price";
  return items.sort((a: any, b: any) => {
    return orderBy[1] === "asc"
      ? a[orderValue] - b[orderValue]
      : b[orderValue] - a[orderValue];
  });
};
export default handleOrder;
