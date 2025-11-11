type HeaderName =
  | HeaderNameEnum.MAIN_GAME
  | HeaderNameEnum.PROFILE
  | HeaderNameEnum.AUTH
  | HeaderNameEnum.QUICK_GAME
  | HeaderNameEnum.RULES
  | HeaderNameEnum.RULES_DETAIL

enum HeaderNameEnum {
    AUTH= "auth",
    MAIN_GAME= "main_game",
    PROFILE = "profile",
    QUICK_GAME = "quick_game",
    RULES = "rules",
    RULES_DETAIL = "NAV_GAME_RULES"
}

export { HeaderName, HeaderNameEnum };