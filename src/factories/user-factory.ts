import { UserController } from "../applications/controllers/user-controller";
import { DestroyUserUserCase } from "../applications/use-cases/user/destroy-user-use-case";
import { LoginUserUseCase } from "../applications/use-cases/user/login-user-use-case";
import { RegisterUserUseCase } from "../applications/use-cases/user/register-user-use-case";
import { ShowUserUseCase } from "../applications/use-cases/user/show-user-use-case";
import { UpdateUserUseCase } from "../applications/use-cases/user/update-user-use-case";
import { UserRepositoryImpl } from "../domains/repositories/user/user-repository-impl";

export class UserFactory {
  static makeUserController(): UserController {
    // repositories
    const userRepository = new UserRepositoryImpl();

    // use cases
    const registerUserUseCase = new RegisterUserUseCase(userRepository);
    const loginUserUseCase = new LoginUserUseCase(userRepository);
    const updateUserUseCase = new UpdateUserUseCase(userRepository);
    const showUserUseCase = new ShowUserUseCase(userRepository)
    const destroyUserUseCase = new DestroyUserUserCase(userRepository)

    // controllers
    const userController = new UserController(
      registerUserUseCase,
      loginUserUseCase,
      updateUserUseCase,
      showUserUseCase,
      destroyUserUseCase
    );
    return userController;
  }
}
