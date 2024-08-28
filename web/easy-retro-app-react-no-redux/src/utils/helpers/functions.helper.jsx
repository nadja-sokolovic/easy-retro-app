export class FunctionHelpers {
  static formatDataForSelect(data) {
    const formatedData = [];
    data.map((item, index) => formatedData.push({
      id: index, 
      value: item.value ? item.value : item, 
      text: item.text ? item.text : item
    }));

    return formatedData;
  }

  static formatItemsByType(items) {
    return items.reduce((acc, item) => {
      const { type } = item;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(item);
      return acc;
    }, {});

    // this will return an object that looks like:
    // {
    //   start: [
    //     items with type: start
    //   ],
    //   continue: [
    //     items with type: continue
    //   ],
    //   stop: [
    //     items with type: stop
    //   ]
    // }

    // if there are not items in some category, the object will not contain that property, so we can have an object that looks like:
    // {
    //   start: [
    //     items with type: start
    //   ]
    // }
  }

  static addItemToTheStateArray(setItems, type, item) {
    setItems((prevItems) => ({
      ...prevItems,
      [type]: prevItems[type] ? [...prevItems[type], item] : [item]
    }))
  }

  static deleteItemFromTheStateArray(setItems, type, itemId) {
    setItems((prevItems) => ({
      ...prevItems,
      [type]: prevItems[type].filter((item) => item.itemId !== itemId)
    }));
  }

  static updateItemInTheStateArray(setItems, type, newItem) {
    setItems((prevItems) => ({
      ...prevItems,
      [type]: prevItems[type].map(item => (item.itemId === newItem.itemId ? newItem : item))
    }));
  }
}