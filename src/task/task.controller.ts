import { Body, Controller, Get, Post, Query, Req, UseGuards, Delete, Param, Put } from '@nestjs/common';
import { TaskDto } from './dto';
import { TaskService } from './task.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() dto: TaskDto, @Req() req: Request) {
    return this.taskService.create(dto, req.user);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  get(@Req() req:Request,@Query("title") title:string){
    return this.taskService.get(req.user,title)
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAll(@Req() req:Request){
    return this.taskService.getAll(req.user)
  }

  @Delete(":id")
  @UseGuards(AuthGuard('jwt'))
  async delete(@Req() req:Request,@Param("id") id:number){
   await this.taskService.delete(req.user,+id)
   return {message: "task deleted"}
  }

  @Put(":id")
  @UseGuards(AuthGuard('jwt'))
   update(@Req() req:Request,@Param("id") id:number,@Body() dto: TaskDto){
    return this.taskService.update(req.user,+id,dto)
    
  }

  @Put(':id/startTime')
  @UseGuards(AuthGuard('jwt'))
  startTime(@Req() req:Request,@Param("id") id:number ) {
    return this.taskService.startTime(req.user,+id)
  }

  @Put(':id/stopTime')
  @UseGuards(AuthGuard('jwt'))
  stopTime(@Req() req:Request,@Param("id") id:number ) {
    return this.taskService.startTime(req.user,+id)
  }



}
