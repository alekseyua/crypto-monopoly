interface payloadErrorCreateGame {
    field: string;
    error: string;
}

interface errorGameState {
[key: string]: string;
}
export type {
    payloadErrorCreateGame,
    errorGameState,
}