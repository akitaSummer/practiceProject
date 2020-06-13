import { Controller, Get, Post } from '@nestjs/common';

@Controller('posts')
export class PostsController {
  @Get()
  index() {
    return [
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
    ]
  }

  @Post()
  create() {
    return {
      success: true
    }
  }

  @Get(':id')
  detail() {
    return {
      id: 5,
      title: 'title'
    }
  }
}
