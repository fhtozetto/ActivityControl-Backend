import { inject, injectable } from 'tsyringe';

import { Department } from '@modules/accounts/infra/typeorm/entities/Department';
import { IDepartmentsRepository } from '@modules/accounts/repositories/IDepartmentsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  description: string;
}

@injectable()
class CreateDepartmentUseCase {
  constructor(
    @inject('DepartmentsRepository')
    private departmentsRepository: IDepartmentsRepository,
  ) {}

  async execute({ description }: IRequest): Promise<Department> {
    const departmentAlreadyExists = await this.departmentsRepository.findByName(
      description,
    );

    if (departmentAlreadyExists) {
      throw new AppError('department already exists!');
    }

    const department = await this.departmentsRepository.create({
      description,
    });
    return department;
  }
}

export { CreateDepartmentUseCase };
