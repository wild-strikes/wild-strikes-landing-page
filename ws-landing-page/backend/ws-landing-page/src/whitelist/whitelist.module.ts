/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { WhitelistService } from './whitelist.service';
import { WhitelistController } from './whitelist.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [WhitelistController],
  providers: [WhitelistService, PrismaService],
  exports: [WhitelistService],
})
export class WhitelistModule {}
