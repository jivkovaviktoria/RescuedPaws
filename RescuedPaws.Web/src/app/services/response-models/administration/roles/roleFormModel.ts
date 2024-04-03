import { Nomenclature } from "../../common/nomenclature";

export class RoleViewModel {
    public name!: string;
    public assignedUsers?: Nomenclature<string>;
}