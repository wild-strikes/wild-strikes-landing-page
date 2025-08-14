/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { WhitelistService } from './whitelist.service';
import { CreateWhitelistDto } from './dto/create-whitelist.dto';

@Controller('whitelist')
export class WhitelistController {
  constructor(private readonly whitelistService: WhitelistService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createWhitelistDto: CreateWhitelistDto) {
    const result = await this.whitelistService.create(createWhitelistDto);
    return {
      success: true,
      message: 'Successfully added to whitelist',
      data: result,
    };
  }

  @Get()
  async findAll() {
    const result = await this.whitelistService.findAll();
    return {
      success: true,
      data: result,
    };
  }

  @Get('stats')
  async getStats() {
    const result = await this.whitelistService.getStats();
    return {
      success: true,
      data: result,
    };
  }

  @Get('check/:walletAddress')
  async checkWhitelist(@Param('walletAddress') walletAddress: string) {
    const isWhitelisted = await this.whitelistService.checkIfWhitelisted(walletAddress);
    return {
      success: true,
      data: {
        walletAddress,
        isWhitelisted,
      },
    };
  }

  @Get(':walletAddress')
  async findOne(@Param('walletAddress') walletAddress: string) {
    const result = await this.whitelistService.findByWalletAddress(walletAddress);
    return {
      success: true,
      data: result,
    };
  }

  @Delete(':walletAddress')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('walletAddress') walletAddress: string) {
    const result = await this.whitelistService.deactivate(walletAddress);
    return {
      success: true,
      message: 'Successfully removed from whitelist',
      data: result,
    };
  }
}
