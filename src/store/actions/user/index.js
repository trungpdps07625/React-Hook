import { readUserAction } from './readUser';
import { deleteUserAction } from './deleteUser'
import { updateUserAction } from './updateUser'
import { createUserAction } from './createUser'
export const ActionsUser = {
    ...readUserAction,
    ...deleteUserAction,
    ...updateUserAction,
    ...createUserAction
}