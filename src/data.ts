export enum ReportType {
  INCOME = "income",
  EXPENSE = "expense"
}

export interface IReport {
  id: string
  source: string
  amount: number
  created_at: Date
  updated_at: Date
  type: ReportType
}

interface IData {
  report: Array<IReport>
}

export const data: IData = {
  report: [
    {
      id: "uuid1",
      amount: 7500,
      created_at: new Date(),
      source: "Salary",
      type: ReportType.INCOME,
      updated_at: new Date()
    },
    {
      id: "uuid2",
      amount: 2500,
      created_at: new Date(),
      source: "Youtube",
      type: ReportType.INCOME,
      updated_at: new Date()
    },
    {
      id: "uuid3",
      amount: 500,
      created_at: new Date(),
      source: "Food",
      type: ReportType.EXPENSE,
      updated_at: new Date()
    },
  ]
}