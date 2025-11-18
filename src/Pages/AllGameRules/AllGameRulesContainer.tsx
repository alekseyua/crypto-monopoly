import React, { useEffect } from 'react'
import AllGameRules from './AllGameRules'
import { SET_HEADER_NAME_IS_SHOW } from '../../store/header/header';
import { HeaderNameEnum } from '../../store/header/header.d';
import { useStoreon } from 'storeon/react';
import { HANDLER_SEARCH_CHANGE, IRule } from '../../store/rules/rule.type.d';

interface StateStore {
    rules: IRule[];
}

interface EventStore {
    [SET_HEADER_NAME_IS_SHOW]: string,
    [HANDLER_SEARCH_CHANGE]: string,
}

const AllGameRulesContainer: React.FC = () => {
    const { dispatch, rules } = useStoreon<StateStore, EventStore>('rules');

    useEffect(() => {
        dispatch(SET_HEADER_NAME_IS_SHOW, HeaderNameEnum.RULES_DETAIL);
    }, [dispatch])


    return (
        <AllGameRules
            rules={rules}
        />
    )
}

export default AllGameRulesContainer