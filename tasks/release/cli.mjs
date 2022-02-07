#!/usr/bin/env node
/* eslint-env node, es2021 */
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import generateReleaseNotes from './generateReleaseNotes.mjs'
import release from './release.mjs'
import updatePullRequestsMilestone from './updatePullRequestsMilestone.mjs'

yargs(hideBin(process.argv))
  .scriptName('release')
  .command('$0', 'Release RedwoodJS', {}, release)
  .command(
    'generate-release-notes [milestone]',
    'Generates release notes for a given milestone',
    (yargs) => {
      yargs.positional('milestone', {
        describe: 'The milestone to generate release notes for',
        type: 'string',
      })
    },
    (argv) => generateReleaseNotes(argv.milestone)
  )
  .command(
    'update-prs-milestone',
    "Update PRs' milestone from something to something",
    (yargs) => {
      yargs.option('from', {
        demandOption: true,
        describe: 'The milestone to PRs from',
        type: 'string',
      })
      yargs.option('to', {
        demandOption: true,
        describe: 'The milestone to PRs to',
        type: 'string',
      })
    },
    ({ from, to }) => updatePullRequestsMilestone(from, to)
  )
  .help()
  .parse()
