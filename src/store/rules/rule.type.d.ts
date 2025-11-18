const HANDLER_SEARCH_CHANGE = 'HANDLER_SEARCH_CHANGE' as const; 

interface IRule {
    id: number;
    title: string;
    rule: string;
}

export  {
    IRule,

    HANDLER_SEARCH_CHANGE,
}