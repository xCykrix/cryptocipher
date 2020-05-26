# Contributing to CryptoCipher

## Development Environment

CryptoCipher uses Yarn for all dependency management and testing purposes. You will be required to download and install Yarn on your operating system to develop with CryptoCipher. If you cannot download Yarn for any reason, you may use NPM. If NPM is required, ensure that no files are commited that include changes from installation with NPM to the upstream repository, as to now allow our lock file to become outdated.

Generally, we use VSCode to develop for CryptoCipher. If you wish to use another IDE, please ensure that IDE specific files are not commited to the upstream repository during commits.

## Husky

 CryptoCipher uses [Husky Commit Hooks](https://github.com/typicode/husky) to ensure that all tests and linting standards pass at commit and push time. While this can be quite obnoxious at times, it helps to ensure that all code meets the required standards before being published.


## ESLint Standard

CryptoCipher uses ESLint to ensure that all code meets a certain expectation. We follow StandardJS's Opinionated Standard, which you can find more information for [at StandardJS's Home Page](https://standardjs.com/). This criteria is enforced both at commit time and with tests on the upstream repository for each commit and pull request. Pull Requests that fail the linting standards will not be accepted.

## Commit Message Standard

CryptoCipher currently loosely follows the [Conventional Commits Standard v1.0.0](https://www.conventionalcommits.org/en/v1.0.0/), which enforced a subset of human readable commit rules to ensure that all commits meet a specific criteria. This will be mandatory in later versions of CryptoCipher with Commitlint and Husky enforcement.

While creating commits, try to keep commits small (we are okay with a lot of commits vs one big commit) and to the specific sections performing work in. We also ask that you try to specify a scope specific to the section of work performed. You can find a few examples below:

`feat(crypto): added check to ensure integrity of encrypted data`

`docs(hash): corrected oversight in documentation for digest`

`fix(drivers,crypto): driver sometimes randomly fails to request from super table for crypto`

`test(crypto): added new test condition for randomly failing tests`

## Mocha and Chai

CryptoCipher uses Mocha and Chai for our unit testing environment. You can find more information for both of these packages [for Mocha, here](https://mochajs.org/), and [for Chai, here](https://www.chaijs.com/).
