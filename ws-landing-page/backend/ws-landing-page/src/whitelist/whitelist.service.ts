/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWhitelistDto } from './dto/create-whitelist.dto';
import { Whitelist } from '@prisma/client';

@Injectable()
export class WhitelistService {
  constructor(private prisma: PrismaService) {}

  async create(createWhitelistDto: CreateWhitelistDto): Promise<Whitelist> {
    try {
      const whitelist = await this.prisma.whitelist.create({
        data: createWhitelistDto,
      });
      return whitelist;
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('Wallet address already whitelisted');
      }
      throw error;
    }
  }

  async findAll(): Promise<Whitelist[]> {
    return this.prisma.whitelist.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByWalletAddress(walletAddress: string): Promise<Whitelist> {
    const whitelist = await this.prisma.whitelist.findUnique({
      where: { walletAddress },
    });

    if (!whitelist) {
      throw new NotFoundException('Wallet address not found in whitelist');
    }

    return whitelist;
  }

  async checkIfWhitelisted(walletAddress: string): Promise<boolean> {
    const whitelist = await this.prisma.whitelist.findUnique({
      where: { 
        walletAddress,
      },
    });

    return !!whitelist && whitelist.isActive;
  }

  async deactivate(walletAddress: string): Promise<Whitelist> {
    try {
      return await this.prisma.whitelist.update({
        where: { walletAddress },
        data: { isActive: false },
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Wallet address not found');
      }
      throw error;
    }
  }

  async getStats() {
    const total = await this.prisma.whitelist.count();
    const active = await this.prisma.whitelist.count({
      where: { isActive: true },
    });

    return {
      total,
      active,
      inactive: total - active,
    };
  }
}
