type HeaderName =
  | HeaderNameEnum.MAIN_GAME
  | HeaderNameEnum.PROFILE
  | HeaderNameEnum.AUTH
  | HeaderNameEnum.QUICK_GAME
  | HeaderNameEnum.RULES

enum HeaderNameEnum {
    AUTH= "auth",
    MAIN_GAME= "main_game",
    PROFILE = "profile",
    QUICK_GAME = "quick_game",
    RULES = "rules",
}

export { HeaderName, HeaderNameEnum };