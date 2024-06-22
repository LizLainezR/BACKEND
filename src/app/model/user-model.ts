import { EnterpriseResponse } from "./entreprise-model"
import { Rol } from "./rol-model"

  interface User{
    id:number,
    username:string,
    email:string,
    remembe_me:boolean,
    email_verified_at:boolean,
    password:string,
    id_role:   number,
    role: Rol[],
    enterprise:EnterpriseResponse,
    enterpriseId:number,
    privilegeId:number
}
interface AuthUserResponse {
    jwt:string,
    msj:string,
    valid:boolean,
    role: Rol[],
    user:UserData}

type UserCredentials=Pick<User,'username'|'password'|'remembe_me'>
type UserAuthenticationResponse=Pick<AuthUserResponse,'jwt'|'msj'|'valid'|'role'|'user'>
type UserData=Pick<User,'id'|'username'|'email'|'email_verified_at'| 'password'|'role'|'id_role'|'remembe_me'|'enterprise'>
type UserDataToSave=Pick<User,  'email'|'username'|'password'|"enterpriseId">
type UserSaveResponse=Pick<User ,'id'|'email'|'password'|'username'>
export {UserCredentials,UserAuthenticationResponse,UserData,UserDataToSave,UserSaveResponse}