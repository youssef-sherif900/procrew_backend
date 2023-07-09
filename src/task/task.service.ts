import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskDto } from './dto';
import { User } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async getAll (user:any){
     return await this.prisma.task.findMany({
      where:{
        user
      }
     })
  }

  async create(dto: TaskDto, user: any) {

    const task = await this.prisma.task.create({
      data: {
        userId: user.id,
        title: dto.title,
        description: dto.description,
      },
    });

    const time = await this.prisma.time.create({
      data:{
        userId:user.id,
        taskId:task.id,
        duration:0
      }
    })
    return task
  }

  async get(user:any,title:string){
    return await this.prisma.task.findMany({
      where:{
        user,
        title
      }
    })
  }
  async delete(user:any,id:number){

   await this.prisma.time.deleteMany({
    where:{
      user,
      id
    }
   })

     await this.prisma.task.deleteMany({
      where:{
        user,
        id
      }
    })
  }

  async update(user:any,id:number, dto: TaskDto){
    return await this.prisma.task.update({
      where: {
        id
      },
      data: {
        ...dto
      },
   })
 }

 async startTime(user:any, id:number){
  return await this.prisma.time.update({
    where:{
      id
    },
    data:{
      startAt:new Date()
    }
  })
 }

 async endTime(user:any, id:number){



  const update = await this.prisma.time.update({
    where:{
      id
    },
    data:{
      endAt:new Date(),
    }
  })

  const task = await this.prisma.time.findUnique({
    where:{
      id
    }
  })

  return await this.prisma.time.update({
    where:{
      id
    },
    data:{
      duration: (task.startAt.getTime()-task.endAt.getTime())
    }
  })



 }
  
}
