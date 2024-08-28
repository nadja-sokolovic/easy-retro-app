export interface ReportModel {
  reportId: number;
  text: string;
  sprint: number;
  boardId: number;
}

export interface ReportsBySprint {
  sprint: number;
  report: ReportModel;
}