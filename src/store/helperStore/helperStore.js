import { delay } from "../../helpers/helper"

export const setErrorTimming = async (action, err, dispatch, time = 500) => {
    
    dispatch(action, err)
    await delay(time);
    dispatch(action, '')
}