import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get()
  async findAll() {
    return await this.listService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.listService.findOne(id);
  }

  @Post()
  async create(@Body() createListDto: CreateListDto) {
    return await this.listService.create(createListDto);
  }
}
