import { EnterpriseResponse } from "./entreprise-model"
import { Menu } from "./menu-model"
import { Privilege } from "./privilege"
import { Rol } from "./rol-model"
import { UserPrivilege } from "./user-privilage"

interface User{
    userId:number,
    username:string,
    email:string,
    remembe_me:boolean,
    email_verified_at:boolean,
    password:string,
    id_rol:number,
    status:boolean,
    privileges:UserPrivilege[],
    privilege:Privilege,
    enterprise:EnterpriseResponse,
    enterpriseId:number,
    privilegeId:number
}
interface AuthUserResponse {
    jwt:string,
    msj:string,
    role_id: Rol[],
    user:UserData
}

type UserCredentials=Pick<User,'username'|'password'|'remembe_me'>
type UserAuthenticationResponse=Pick<AuthUserResponse,'jwt'|'msj'|'role_id'|'user'>
type UserData=Pick<User,'userId'|'username'|'email'|'email_verified_at'| 'password'|'remembe_me'|'privileges'|'enterprise'>
type UserDataToSave=Pick<User,  'email'|'username'|'password'|'status'|"enterpriseId"|"privilegeId">
type UserSaveResponse=Pick<User ,'userId'|'email'|'password'|'username'|'status'|'privilege'>

export {UserCredentials,UserAuthenticationResponse,UserData,UserDataToSave,UserSaveResponse}