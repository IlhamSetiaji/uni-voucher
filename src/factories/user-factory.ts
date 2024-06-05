import { UserController } from "../applications/controllers/user-controller";
import { LoginUserUseCase } from "../applications/use-cases/user/login-user-use-case";
import { RegisterUserUseCase } from "../applications/use-cases/user/register-user-use-case";
import { UserRepositoryImpl } from "../domains/repositories/user/user-repository-impl";

export class UserFactory {
  static makeUserController(): UserController {
    // repositories
    const userRepository = new UserRepositoryImpl();

    // use cases
    const registerUserUseCase = new RegisterUserUseCase(userRepository);
    const loginUserUseCase = new LoginUserUseCase(userRepository);

    // controllers
    const userController = new UserController(
      registerUserUseCase,
      loginUserUseCase
    );
    return userController;
  }
}
