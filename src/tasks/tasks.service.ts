import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './task.model';
import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';


@Injectable()
export class TasksService {

  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
    const {status, search} = filterDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter(t => t.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        t => t.title.includes(search) || t.description.includes(search)
      )
    }

    return tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    
    const {title, description} = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description, 
      status: TaskStatus.OPEN
    }

    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    return this.tasks.find( t => t.id === id)
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task: Task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}