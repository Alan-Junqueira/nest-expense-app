import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator"

export class CreateReportDTO {
  @IsNumber()
  @IsPositive()
  amount: number

  @IsString()
  @IsNotEmpty()
  source: string
}

export class UpdateReportDTO {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  amount: number

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  source: string
}