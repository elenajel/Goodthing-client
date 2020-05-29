const handleSeacrh = (items: any, value: string) => {
  if (value !== "") {
    let query: string = value.trim();
    let filtered = items.filter(({ item_name }: any) =>
      item_name.startsWith(query),
    );
    return filtered;
  } else {
    return items;
  }
};
export default handleSeacrh;
