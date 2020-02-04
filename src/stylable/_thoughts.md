This could be restructured to be:
    Drawable
    --------
    - static uncoloredStyles
    - getThemes
    constructor ==> ... registerThemes

    Stylable (singleton)
    --------------------
    + registerThemes(name, themes)

current problems:
- style tags overwrite each other sometimes
- no way to set styles on one drawable through the stylable framework