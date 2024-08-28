import { RetroItem } from './../../core/models/retro-item.model';

export function getItemsForActionsTab(allItems: RetroItem[]) {
  let items: any[] = [];
  let startItems: RetroItem[] = [];
  let continueItems: RetroItem[] = [];
  let stopItems: RetroItem[] = [];

  allItems.forEach(item => {
    switch(item.type) {
      case 'start':
        startItems.push(item);
        break;
      case 'continue':
        continueItems.push(item);
        break;
      case 'stop':
        stopItems.push(item);
        break;
    }
  })

  items.push(startItems);
  items.push(continueItems);
  items.push(stopItems);
  return items;
}

export function getItemsForStoryCompetitionTab(allItems: RetroItem[]) {
  let items: any[] = [];
  let best: RetroItem[] = [];
  let mostAnnoying: RetroItem[] = [];
  let mostTechnicallyComplex: RetroItem[] = [];
  let mostExciting: RetroItem[] = [];

  allItems.forEach(item => {
    switch(item.type) {
      case 'best-story':
        best.push(item);
        break;
      case 'most-annoying-story':
        mostAnnoying.push(item);
        break;
      case 'most-technically-complex-story':
        mostTechnicallyComplex.push(item);
        break;
      case 'most-exciting-story':
        mostExciting.push(item);
        break;
    }
  })

  items.push(best);
  items.push(mostAnnoying);
  items.push(mostTechnicallyComplex);
  items.push(mostExciting);
  return items;
}

export function initItemList() {
  const item1 = new RetroItem();
  item1.type = 'best-story';
  const item2 = new RetroItem();
  item2.type = 'most-annoying-story';
  const item3 = new RetroItem();
  item3.type = 'most-technically-complex-story';
  const item4 = new RetroItem();
  item4.type = 'most-exciting-story';
  let allItems = [];
  allItems.push([item1]);
  allItems.push([item2]);
  allItems.push([item3]);
  allItems.push([item4]);

  return allItems;
}