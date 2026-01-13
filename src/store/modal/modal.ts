import { StoreonStore } from "storeon";
import { _INIT } from "../auth/auth";
import { v4 } from "uuid";

export const SET_MODAL = 'modal/set_modal' as const;

export const modal = (store: StoreonStore) => {
    interface IModal {
        isOpen: boolean;
        content: React.ReactNode | string | number;
        title: string;
        type?: string;
        confirmBtn: string;
        cancelBtn: string;
        confirmCallback: () => void;
        cancelCallback: () => void;
    }

    const initModal: IModal = {
        isOpen: false,
        content: '',
        title: '',
        confirmBtn: 'ok',
        cancelBtn: 'cancel',
        confirmCallback: ()=>{},
        cancelCallback: () => {}
    }
    store.on(_INIT, ()=>({modal: initModal}))
    store.on(SET_MODAL, (store: any, data) => (
        {
            modal: {
                ...store.modal,
                ...data
            }
        }
    ));

}