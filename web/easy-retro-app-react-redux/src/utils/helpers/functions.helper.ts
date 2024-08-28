import { SelectData } from "models/helper.model";
import { ItemModel, Items, ItemsBySprint } from "models/item.model";

export class FunctionHelpers {
  static formatDataForSelect(data: Array<number>): Array<SelectData> {
    const formatedData: Array<SelectData> = [];
    data.map((item, index) => formatedData.push({
      id: index, 
      value: item, 
      text: item
    }));

    return formatedData;
  }

  static formatItemsByType(items: Array<ItemModel>): Items {
    return items.reduce((acc: any, item) => {
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

  static organizeItemsBySprint(items: Array<ItemModel>): ItemsBySprint | null {
    // Group items by sprint
    const groupedBySprint = items.reduce((acc: Record<number, ItemModel[]>, item) => {
      const { sprint } = item;
      if (!acc[sprint]) {
        acc[sprint] = [];
      }
      acc[sprint].push(item);
      return acc;
    }, {});
  
    // Format items by type within each sprint
    // return Object.keys(groupedBySprint).map(sprint => ({
    //   sprint: Number(sprint),
    //   items: this.formatItemsByType(groupedBySprint[Number(sprint)])
    // }));

    // Get the first sprint
  const firstSprint = Object.keys(groupedBySprint)[0];
  
  if (firstSprint === undefined) {
    return null; // Return null if no sprints are found
  }

  // Format items by type within the first sprint
  return {
    sprint: Number(firstSprint),
    items: this.formatItemsByType(groupedBySprint[Number(firstSprint)])
  };
  };

  static toCamelCase(str: string): string {
    return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
  }
  
}