import { OptionMenuPrivilegeToSave } from "./option-menu-privilage"

interface Menu{
      optionMenuId:number,
      formTitle: string,
      formDescription: string,
      formUrl: string,
      icon: string,
      orderMenu:number,
      status:boolean,
      parent:Menu,
      submenu:Menu[],
      optionMenuPrivileges:OptionMenuPrivilegeToSave[],
}
type RequestMenuToSave=Pick<Menu,'formTitle'| 'formDescription'|'formUrl'|'icon'|'orderMenu'|'parent'|'optionMenuPrivileges'>
export {Menu,RequestMenuToSave}