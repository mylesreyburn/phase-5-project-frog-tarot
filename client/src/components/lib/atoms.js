import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const userAtom = atom({
    key: "userIdKey",
    default: null,
    effects_UNSTABLE: [persistAtom]
})

export const loggedInAtom = atom({
    key: "loggedInKey",
    default: false,
    effects_UNSTABLE: [persistAtom]
})