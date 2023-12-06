import Zundoukan from "./zundoukan";
import Kinugoshi from "./kinugoshi";
import Fukuro from "./fukuro";
import { UseFormSetValue, FieldValues } from "react-hook-form"

export interface Props {
    index: number;
    control: any;
    md?: any;
    setValue?:any
}

export {Zundoukan,Kinugoshi,Fukuro}