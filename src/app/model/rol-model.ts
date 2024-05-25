interface RoleEntity{
    role_id: number,
    role_name: string,
}
type Rol=Pick<RoleEntity,'role_id'|'role_name'>



export {Rol}