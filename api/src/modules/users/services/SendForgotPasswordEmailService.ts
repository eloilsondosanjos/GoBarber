import { inject, injectable } from 'tsyringe';

// import User from '@modules/users/infra/typeorm/entities/User';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const checkUserExist = await this.usersRepository.findByEmail(email);

    if (!checkUserExist) {
      throw new AppError('User does not exists');
    }

    this.mailProvider.sendMail(
      email,
      'Pedido de recuperação de senha recebida.',
    );
  }
}

export default SendForgotPasswordEmailService;
