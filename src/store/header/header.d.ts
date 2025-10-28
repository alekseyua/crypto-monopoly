type HeaderName =
  | HeaderNameEnum.MAIN_GAME
  | HeaderNameEnum.PROFILE
  | HeaderNameEnum.AUTH
  | HeaderNameEnum.QUICK_GAME;

enum HeaderNameEnum {
    AUTH= "auth",
    MAIN_GAME= "main_game",
    PROFILE = "profile",
    QUICK_GAME = "quick_game",
}

export { HeaderName, HeaderNameEnum };