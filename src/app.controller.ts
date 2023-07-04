import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ReportType } from './data';
import { AppService } from './app.service';

@Controller('report/:type')
export class AppController {
  constructor(
    private readonly appService: AppService
  ) { }

  @Get()
  getAllReports(
    @Param('type') type: string
  ) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    return this.appService.getAllReports(reportType)
  }

  @Get(':id')
  getReportById(
    @Param('type') type: string,
    @Param('id') id: string
  ) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    return this.appService.getReportById({ id, type: reportType })
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
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    return this.appService.createReport({ type: reportType, newData: { amount, source } })
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
    return this.appService.updateReport({ id, newData: { amount, source }, type: reportType })
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(
    @Param('id') id: string
  ) {
    return this.appService.deleteReport(id)
  }
}
