import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { ReportType, data } from 'src/data';
import { ReportResponseDTO } from 'src/dtos/report.dto';

interface IReport {
  amount: number,
  source: string
}

interface IUpdateReport {
  amount?: number,
  source?: string
}

@Injectable()
export class ReportService {
  getAllReports(type: ReportType): ReportResponseDTO[] {
    return data.report.filter(report => report.type === type).map(report => new ReportResponseDTO(report))
  }

  getReportById({
    type,
    id
  }: { type: ReportType, id: string }): ReportResponseDTO {
    const report = data.report.filter(report => report.type === type).find(report => report.id === id)

    if (!report) return

    return new ReportResponseDTO(report)
  }
  createReport({
    type, newData
  }: { type: ReportType, newData: IReport }): ReportResponseDTO {
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
    return new ReportResponseDTO(newReport)
  }

  updateReport({
    type,
    newData,
    id
  }: { type: ReportType, newData: IUpdateReport, id: string }): ReportResponseDTO {
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

    return new ReportResponseDTO(data.report[reportIndex])
  }
  deleteReport(id: string) {
    const reportIndex = data.report.findIndex(report => report.id === id)

    if (reportIndex === -1) return

    data.report.splice(reportIndex, 1)

    return
  }
}
