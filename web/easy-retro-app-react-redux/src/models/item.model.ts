export interface ItemModel {
  itemId: number;
  type: string;
  text: string;
  sprint: number;
  boardId?: number;
  reactions: ItemReactions;
}

export interface ItemReactions {
  likeCount: number;
  dislikeCount: number;
}

export interface ItemRequest {
  itemId?: number;
  type: string;
  text: string;
  sprint: number;
}

export interface Items {
  start?: Array<ItemModel>;
  continue?: Array<ItemModel>;
  stop?: Array<ItemModel>;
  bestStory?: Array<ItemModel>;
  mostAnnoyingStory?: Array<ItemModel>;
  mostTechnicallyComplexStory?: Array<ItemModel>;
  mostExcitingStory?: Array<ItemModel>;
  [key: string]: Array<ItemModel> | undefined;
}

export interface ItemsBySprint {
  sprint: number;
  items: Items;
}

export enum ItemType {
  start = 'start',
  continue = 'continue',
  stop = 'stop',
  bestStory = 'best-story',
  mostAnnoyingStory = 'most-annoying-story',
  mostTechnicallyComplexStory = 'most-technically-complex-story',
  mostExcitingStory = 'most-exciting-story'
}