module.exports = {
    "platform": "bitbucket",
    "autodiscover": true,
    "autodiscoverFilter": ["reposidk"],
    "prConcurrentLimit": 0,
    "prHourlyLimit": 0,
    "unicodeEmoji": true,
    "enabled": true,
    "rebaseWhen": "auto",
    "recreateClosed": true,
    "enabledManagers": ["gomod"],
    "separateMajorMinor": false,
    "separateMinorPatch": true,
    "prTitleStrict": true,
    "gomod": {
      "constraintsFiltering": "strict"
    },
    "postUpdateOptions": ["gomodTidy"],
    "packageRules": [
      {
        "matchUpdateTypes": ["patch"],
        "groupName": ["patch"],
        "groupSlug": ["patch-update"],
        "enabled": true,
      }
    ],
    "requireConfig": "optional",
    "onboarding": false,
    "minor": {
      "enabled": false
    },
    "major": {
      "enabled": false
    },
    "patch": {
      "enabled": true
    }
  };
  