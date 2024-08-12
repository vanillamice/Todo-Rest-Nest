import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';
import { List } from './entities/list.entity';

@Injectable()
export class ListRepository {
  private readonly filePath = path.join(__dirname, 'lists.json');

  async findAll(): Promise<List[]> {
    const data = await this.readFile();
    return JSON.parse(data);
  }

  async findOne(id: string): Promise<List | undefined> {
    const lists = await this.findAll();
    return lists.find(list => list.id === id);
  }

  async create(list: List): Promise<void> {
    const lists = await this.findAll();
    lists.push(list);
    await this.writeFile(lists);
  }

  private async readFile(): Promise<string> {
    try {
      return await fs.readFile(this.filePath, 'utf8');
    } catch (error) {
      if (error.code === 'ENOENT') {
        await this.writeFile([]);
        return '[]';
      }
      throw error;
    }
  }

  private async writeFile(data: any): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf8');
  }
}
