import { Menu } from "./menu-model";

interface PrivilegeEntity{
    privilegeId: number,
    status: boolean,
    type: string,
    menuOptions:Menu[],
}
type Privilege=Pick<PrivilegeEntity,'privilegeId'|'status'|'type'|'menuOptions'>



export {Privilege}