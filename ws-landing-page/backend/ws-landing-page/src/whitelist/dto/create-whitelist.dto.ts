/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { IsString, IsOptional } from 'class-validator';

export class CreateWhitelistDto {
  @IsString()
  walletAddress: string;

  @IsOptional()
  @IsString()
  signature?: string;

  @IsOptional()
  @IsString()
  message?: string;
}
