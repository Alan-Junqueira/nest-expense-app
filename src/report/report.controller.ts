import { Body, Controller, Delete, Get, HttpCode, Param, ParseEnumPipe, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ReportType } from 'src/data';
import { ReportResponseDTO, CreateReportDTO, UpdateReportDTO } from 'src/dtos/report.dto';
import { ReportService } from './report.service';

@Controller('report/:type')
export class ReportController {
  constructor(
    private readonly reportService: ReportService
  ) { }

  @Get()
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: string
  ): ReportResponseDTO[] {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    return this.reportService.getAllReports(reportType)
  }

  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string
  ): ReportResponseDTO {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    return this.reportService.getReportById({ id, type: reportType })
  }

  @Post()
  @HttpCode(201)
  createReport(
    @Body() { amount, source }: CreateReportDTO,
    @Param('type', new ParseEnumPipe(ReportType)) type: string
  ): ReportResponseDTO {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    return this.reportService.createReport({ type: reportType, newData: { amount, source } })
  }

  @Put(':id')
  updateReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() { amount, source }: UpdateReportDTO,
  ): ReportResponseDTO {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    return this.reportService.updateReport({ id, newData: { amount, source }, type: reportType })
  }

  @Delete(':id')
  @HttpCode(204)
  deleteReport(
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return this.reportService.deleteReport(id)
  }
}
