import { Body, Controller, Delete, Get, HttpCode, Param, ParseEnumPipe, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ReportType } from './data';
import { AppService } from './app.service';
import { CreateReportDTO, ReportResponseDTO, UpdateReportDTO } from './dtos/report.dto';

@Controller('report/:type')
export class AppController {
  constructor(
    private readonly appService: AppService
  ) { }

  @Get()
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: string
  ): ReportResponseDTO[] {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    return this.appService.getAllReports(reportType)
  }

  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string
  ): ReportResponseDTO {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    return this.appService.getReportById({ id, type: reportType })
  }

  @Post()
  @HttpCode(201)
  createReport(
    @Body() { amount, source }: CreateReportDTO,
    @Param('type', new ParseEnumPipe(ReportType)) type: string
  ): ReportResponseDTO {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    return this.appService.createReport({ type: reportType, newData: { amount, source } })
  }

  @Put(':id')
  updateReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() { amount, source }: UpdateReportDTO,
  ): ReportResponseDTO {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    return this.appService.updateReport({ id, newData: { amount, source }, type: reportType })
  }

  @Delete(':id')
  @HttpCode(204)
  deleteReport(
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return this.appService.deleteReport(id)
  }
}
