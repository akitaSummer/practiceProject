import { 
    Controller,
    Get,
    Post,
    Body,
    UseFilters,
 } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto'
import { Cat } from './interfaces/cat.interface'

@Controller('cats')
@UseFilters(HttpExceptionFilter)
export class CatsController {
    constructor(private catsService: CatsService) {}

    @Post()
    @UseFilters(new HttpExceptionFilter)
    async create(@Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto)
    }

    @Get()
    async findAll(): Promise<Cat[]> {
        return this.catsService.findAll()
    }
}
