module.exports = {
    "roots": [
      "<rootDir>/packages/"
    ],
    "testMatch": [
      "**/__tests__/**/*test.+(ts|tsx|js)",
    ],
    "transform": {
      "^.+\\.(ts|tsx)$": "ts-jest"
    },
  }