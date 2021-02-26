/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';
import AppError from '../errors/AppError';
import UsersRepository from '../repositories/UsersRepository';

class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
    });

    // Outra maneira de validar
    // if (await !schema.isValid(request.body)) {
    //   return response.status(400).json({
    //     error: 'Validation Failed',
    //   });
    // }

    try {
      schema.validate(request.body, { abortEarly: false });
    } catch (error) {
      return response.status(400).json(error);
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const userAlreadyExist = await usersRepository.findOne({
      email,
    });

    if (userAlreadyExist) {
      throw new AppError('User already exists.');
    }

    const user = usersRepository.create({
      name,
      email,
    });

    await usersRepository.save(user);

    return response.status(201).json(user);
  }
}

export default UserController;
