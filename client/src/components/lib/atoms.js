import { atom } from "recoil";

export const userAtom = atom({
    key: "userIdKey",
    default: null
})

export const loggedInAtom = atom({
    key: "loggedInKey",
    default: false
})