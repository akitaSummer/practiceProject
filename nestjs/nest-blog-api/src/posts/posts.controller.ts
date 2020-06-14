import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { PostModel } from './post.model';
import { IsNotEmpty } from 'class-validator'; // 用于类型验证

class CreatePostBto {
  @ApiModelProperty({ description: '贴子标题', example: '贴子标题1' }) // 设置detail
  @IsNotEmpty({ message: '请填写标题' })
  title: string
  @ApiModelProperty({ description: '贴子内容', example: '贴子内容1' })
  content: string
}

@Controller('posts')
@ApiTags('贴子') // 设置tag描述
export class PostsController {
  @Get()
  @ApiOperation({ summary: '显示博客列表' })
  async index() {
    return await PostModel.find()
  }

  @Post()
  @ApiOperation({ summary: '创建贴子' })
  async create(@Body() createPostBto: CreatePostBto) {
    await PostModel.create(createPostBto)
    return {
      success: true
    }
  }

  @Get(':id')
  @ApiOperation({ summary: '贴子详情' })
  async detail(@Param('id') id: string) {
    return await PostModel.findById(id)
  }

  @Put(':id')
  @ApiOperation({ summary: '编辑贴子' })
  async update(@Param('id') id: string, @Body() updatePostDto: CreatePostBto) {
    await PostModel.findByIdAndUpdate(id, updatePostDto)
    return {
      success: true
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除贴子' })
  async remove(@Param('id') id: string) {
    await PostModel.findByIdAndDelete(id)
    return {
      success: true
    }
  }
}
