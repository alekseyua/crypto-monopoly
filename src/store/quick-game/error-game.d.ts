interface errorCreateGame {
    field: string;
    error: string;
}

interface errorGameState {
[key: string]: string;
}
export type {
    errorCreateGame,
    errorGameState,
}