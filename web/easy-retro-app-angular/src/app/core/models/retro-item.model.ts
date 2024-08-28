export class RetroItem {
  itemId: number = 0;
  type: string = '';
  text: string = '';
  description: string | undefined = undefined;
  sprint: number | undefined = undefined;
  board_id: number = 1;
  reactions?: any = {
    likeCount: 0,
    dislikeCount: 0
  };
  discussion?: any = [];
}