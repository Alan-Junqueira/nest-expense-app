import { Injectable } from '@nestjs/common';
import { ReportType, data } from './data';
import { randomUUID } from 'node:crypto';

interface IReport {
  amount: number,
  source: string
}

interface IUpdateReport {
  amount?: number,
  source?: string
}

@Injectable()
export class AppService {
  getAllReports(type: ReportType) {
    return data.report.filter(report => report.type === type)
  }

  getReportById({ type, id }: { type: ReportType, id: string }) {
    return data.report.filter(report => report.type === type).find(report => report.id === id)
  }
  createReport({
    type, newData
  }: { type: ReportType, newData: IReport }) {
    const { amount, source } = newData

    const newReport = {
      id: randomUUID(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type
    }

    data.report.push(newReport)
    return newReport
  }

  updateReport({
    type,
    newData,
    id
  }: { type: ReportType, newData: IUpdateReport, id: string }) {
    const { amount, source } = newData
    const reportToUpdate = data.report.filter(report => report.type === type).find(report => report.id === id)

    if (!reportToUpdate) return;

    const reportIndex = data.report.findIndex(report => report.id === reportToUpdate.id)

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      amount,
      source,
      updated_at: new Date()
    }

    return data.report[reportIndex]
  }
  deleteReport(id: string) {
    const reportIndex = data.report.findIndex(report => report.id === id)

    if (reportIndex === -1) return

    data.report.splice(reportIndex, 1)

    return
  }
}
