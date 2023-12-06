import dayjs, { Dayjs } from "dayjs";

export type FormValues = {
  formData: {
    id: string;
    // deletedId : string;
    // unitName: string;
    tokuisakiCd: string;
    tokuisakiName: string;
    jyuchuYmd: Date | Dayjs;
    nouhinYmd: Date | Dayjs; // delivery date (previous version date) 
    syohinCd: string;
    syohinName: string; // product
    teikeisaki: string; // schoolType
    suryo: number; // amount
    kamawari: number; // pot
    cut: string;
    kansanA: number;
    kansanB: number;
    nouhinsuryo: number; 
    cyumonsaZentai: number; 
    cyumonsa1Kama: number; 
    bikou1: string; // remark
    bikou2: string; // remark2
    tani:string;
    keisanSettei:number
    fukuroKijyunchi:number
  }[];
};
