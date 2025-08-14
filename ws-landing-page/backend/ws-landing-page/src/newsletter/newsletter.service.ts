/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import { Newsletter } from '@prisma/client';
@Injectable()
export class NewsletterService {
  constructor(private prisma: PrismaService) {}

  async create(createNewsletterDto: CreateNewsletterDto): Promise<Newsletter> {
    try {
      const newsletter = await this.prisma.newsletter.create({
        data: createNewsletterDto,
      });
      return newsletter;
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('Email already subscribed');
      }
      throw error;
    }
  }

  async findAll(): Promise<Newsletter[]> {
    return this.prisma.newsletter.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByEmail(email: string): Promise<Newsletter> {
    const newsletter = await this.prisma.newsletter.findUnique({
      where: { email },
    });

    if (!newsletter) {
      throw new NotFoundException('Email not found');
    }

    return newsletter;
  }

  async remove(email: string): Promise<Newsletter> {
    try {
      return await this.prisma.newsletter.delete({
        where: { email },
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Email not found');
      }
      throw error;
    }
  }
}
