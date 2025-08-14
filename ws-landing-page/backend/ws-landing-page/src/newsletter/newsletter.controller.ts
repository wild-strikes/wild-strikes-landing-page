/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import {CreateNewsletterDto } from './dto/create-newsletter.dto';

@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}
  
  @Get()
  async findAll() {
    const result = await this.newsletterService.findAll();
    return {
      success: true,
      data: result,
    };
  }

  @Post()
  async create(@Body() createNewsletterDto: CreateNewsletterDto) {
    const result = await this.newsletterService.create(createNewsletterDto);
    return {
      success: true,
      data: result,
    };
  }

  @Get(':email')
  async findOne(@Param('email') email: string) {
    const result = await this.newsletterService.findByEmail(email);
    return {
      success: true,
      data: result,
    };
  }

  @Delete(':email')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('email') email: string) {
    const result = await this.newsletterService.remove(email);
    return {
      success: true,
      message: 'Unsubscribed successfully',
      data: result,
    };
  }
}
