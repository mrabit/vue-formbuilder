export const getSelectItem = (arr, item, temp_data) => {
  arr.map(v => {
    if (v.children && v.children.length) getSelectItem(v.children, item, temp_data);
    item.map(val => {
      if (v.value == val) {
        temp_data.unshift(v);
      }
    })
  })
}

export const getSelections = (arr, label, value, selections) => {
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    item.__label = label ? label + ' / ' + item.label : item.label;
    item.__value = value ? value + ',' + item.value : item.value;

    if (item.children && item.children.length) {
      getSelections(item.children, item.__label, item.__value, selections);
      delete item.__label;
      delete item.__value;
    } else {
      selections.push({
        label: item.__label,
        value: item.__value,
        display: item.__label,
        item: item,
        disabled: !!item.disabled
      });
    }
  }
}
