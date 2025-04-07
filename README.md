# 35226
reproduction for renovate [discussion 35226](https://github.com/renovatebot/renovate/discussions/35226)

**Note:** In the original scenario, renovate works via the CLI, being executed by ansible AWX in a private bitbucket workspace. Even testing options such as:

- "separateMinorPatch": true,
- "matchUpdateTypes": ["patch"]

It didn't work. This problem only occurs with golang, the version of go on the machine is 1.23.4, but I had the same problem with 1.24.x, the version of go.mod was 1.19.


## current behavior

Renovate searches for the latest version. Since it's a minor change, and patch is set, it doesn't do anything. This is in fact what should happen, but it doesn't even look for the patched versions, it just ignores them.

```json
{
  "datasource": "go",
  "depType": "require",
  "depName": "bitbucket.org/myrepo/myrepo.sdk",
  "currentValue": "v1.3.5",
  "managerData": {
    "multiLine": true,
    "lineNumber": 5
  },
  "updates": [
    {
      "bucket": "latest",
      "newVersion": "v1.5.10",
      "newValue": "v1.5.10",
      "releaseTimestamp": "2024-09-03T17:50:36.000Z",
      "newVersionAgeInDays": 215,
      "newMajor": 1,
      "newMinor": 5,
      "newPatch": 10,
      "updateType": "minor",
      "libYears": 1.7240709433819066,
      "branchName": "renovate/bitbucket.org-myrepo-myrepo.sdk-1.x"
    }
  ]
}

```

## Expected behavior

I managed to find a temporary solution by setting “allowedVersions” to “<=1.3.x”. Using this, it found the patched versions, however, this is impractical, since different repositories can be on different minor versions, and it only works normally on the latest major or minor version.

```json
{
  "datasource": "go",
  "depType": "require",
  "depName": "bitbucket.org/myrepo/myrepo.sdk",
  "currentValue": "v1.3.5",
  "managerData": {
    "multiLine": true,
    "lineNumber": 5
  },
  "updates": [
    {
      "bucket": "latest",
      "newVersion": "v1.3.11",
      "newValue": "v1.3.11",
      "releaseTimestamp": "2024-03-05T12:24:38.000Z",
      "newVersionAgeInDays": 398,
      "newMajor": 1,
      "newMinor": 3,
      "newPatch": 11,
      "updateType": "patch",
      "pendingChecks": true,
      "libYears": 1.2261846981886257,
      "branchName": "renovate/patch-patch-update"
    }
  ]
}
```