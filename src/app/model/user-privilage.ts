import { Privilege } from "./privilege"

interface UserPrivilegePK{
    userId:number,
    privilegeId:number,
}
interface UserPrivilege{
    userPrivilegeId:UserPrivilegePK,
    privilege: Privilege
}

export {UserPrivilege}