import { Nomenclature } from "../../common/nomenclature";

export class RoleFormModel {
    public id!: string;
    public name!: string;
    public assignedUsers?: Nomenclature<string>[];
}