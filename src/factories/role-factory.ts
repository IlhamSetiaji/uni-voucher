import { RoleController } from "../applications/controllers/role-controller";
import { CreateRoleUseCase } from "../applications/use-cases/role/create-role-use-case";
import { GetAllRoleUseCase } from "../applications/use-cases/role/get-all-role-use-case";
import { UpdateRoleUseCase } from "../applications/use-cases/role/update-role-use-case";
import { RoleRepositoryImpl } from "../domains/repositories/role/role-repository-impl";

export class RoleFactory {
  static makeRoleController(): RoleController {
    // repositories
    const roleRepository = new RoleRepositoryImpl();

    // use cases
    const createRoleUseCase = new CreateRoleUseCase(roleRepository);
    const getAllRoleUseCase = new GetAllRoleUseCase(roleRepository)
    const updateRoleUseCase = new UpdateRoleUseCase(roleRepository)

    // controllers
    const roleController = new RoleController(
      createRoleUseCase,
      getAllRoleUseCase,
      updateRoleUseCase
    );
    return roleController;
  }
}
