interface OptionMenuPrivilege{
    optionMenuPrivilegeId:number,
    privilegeId:number,
    optionMenuId:number,
    status:boolean
}

type OptionMenuPrivilegeToSave=Pick<OptionMenuPrivilege,'optionMenuPrivilegeId'|'privilegeId'|'status'>

export {OptionMenuPrivilegeToSave}