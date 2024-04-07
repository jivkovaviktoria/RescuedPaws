import { Nomenclature } from "../../common/nomenclature";

export class RoleFormModel {
    public name!: string;
    public assignedUsers?: Nomenclature<string>[];
}