import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ReportType, data } from './data';
import { randomUUID } from 'node:crypto';

@Controller('report/:type')
export class AppController {
  @Get()
  getAllReports(
    @Param('type') type: string
  ) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    console.log(type)
    return data.report.filter(report => report.type === reportType)
  }

  @Get(':id')
  getReportById(
    @Param('type') type: string,
    @Param('id') id: string
  ) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    return data.report.filter(report => report.type === reportType).find(report => report.id === id)
  }

  @HttpCode(201)
  @Post()
  createReport(
    @Body() { amount, source }: {
      amount: number,
      source: string
    },
    @Param('type') type: string
  ) {
    const newReport = {
      id: randomUUID(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    }

    data.report.push(newReport)
    return newReport
  }

  @Put(':id')
  updateReport(
    @Param('type') type: string,
    @Param('id') id: string,
    @Body() { amount, source }: {
      amount: number,
      source: string
    },
  ) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    const reportToUpdate = data.report.filter(report => report.type === reportType).find(report => report.id === id)

    if (!reportToUpdate) return;

    const reportIndex = data.report.findIndex(report => report.id === reportToUpdate.id)

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      amount,
      source
    }

    return data.report[reportIndex]
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(
    @Param('id') id: string
  ) {
    const reportIndex = data.report.findIndex(report => report.id === id)

    if (reportIndex === -1) return

    data.report.splice(reportIndex, 1)

    return
  }
}
