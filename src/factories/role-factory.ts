import { RoleController } from "../applications/controllers/role-controller";
import { CreateRoleUseCase } from "../applications/use-cases/role/create-role-use-case";
import { RoleRepositoryImpl } from "../domains/repositories/role/role-repository-impl";

export class RoleFactory {
  static makeRoleController(): RoleController {
    // repositories
    const roleRepository = new RoleRepositoryImpl();

    // use cases
    const createRoleUseCase = new CreateRoleUseCase(roleRepository);

    // controllers
    const roleController = new RoleController(createRoleUseCase);
    return roleController;
  }
}
