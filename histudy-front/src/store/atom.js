import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "localStorage", //원하는 key 값 입력
  storage: localStorage,
});

export const darkState = atom({
  key: "darkMode",
  default: false,
});

export const isLoginState = atom({
  key: "isLogin",
  default: true,
});

export const isRegisterModalState = atom({
  key: "isRegisterModal",
  default: false,
});

export const userLoginInfo = atom({
  key: "userLoginInfo",
  default: null,
});

export const isCodeModalState = atom({
  key: "codeModal",
  default: false,
});

export const isDelete = atom({
  key: "deleteSnackbar",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const selectState = atom({
  key: "sidebarSelect",
  default: 1,
});

export const isLoadingState = atom({
  key: "isLoading",
  default: false,
});

export const groupAutoCompleteState = atom({
  key: "groupAutoComplete",
  default: [],
});
