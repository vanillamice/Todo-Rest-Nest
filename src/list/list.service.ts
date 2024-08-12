import { Injectable } from '@nestjs/common';
import { ListRepository } from './list.repository';
import { CreateListDto } from './dto/create-list.dto';
import { List } from './entities/list.entity';

@Injectable()
export class ListService {
  constructor(private readonly listRepository: ListRepository) {}

  async findAll(): Promise<List[]> {
    return await this.listRepository.findAll();
  }

  async findOne(id: string): Promise<List | undefined> {
    return await this.listRepository.findOne(id);
  }

  async create(createListDto: CreateListDto): Promise<void> {
    const list: List = {
      id: Date.now().toString(),
      ...createListDto,
    };
    await this.listRepository.create(list);
  }
}
