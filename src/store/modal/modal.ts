import { StoreonStore } from "storeon";
import { _INIT } from "../auth/auth";
import { v4 } from "uuid";
import { data } from "react-router-dom";

export const SET_MODAL = v4();

export const modal = (store: StoreonStore) => {
    interface IModal {
        isOpen: boolean;
        content: React.ReactNode | string | number;
        title: string;        
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