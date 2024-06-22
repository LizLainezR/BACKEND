import { Rol } from "./rol-model";

export interface Module {
      id_module: number;
      description: string;
    }
      
    export interface Submodule {
      id_submodule: number;
      description: string;
      id_module: number;
      url:string,
      modulo: Module[];
    }

    export interface Permission {
      id: number;
      description: string;
      id_role: number;
      id_submodule: number;
      submodule: Submodule[]
    }

    export interface DataPermissions{
      role: Rol[];
      submodulo: Submodule[]
    }

export type RespuestaModule = Pick<Module, 'id_module' | 'description'>;
export type RespuestaSubmodule=Pick<Submodule, 'id_submodule' | 'description' | 'id_module' |'modulo'>;
export  type PermissionMenu =Pick<Permission, 'id' | 'description' | 'id_role' | 'id_submodule'| 'submodule'>;
 