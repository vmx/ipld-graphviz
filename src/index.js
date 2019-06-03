'use strict'

// Get relations between CIDs and print those in a useful way

const CID = require('cids')

const getRelations = require('./get-relations.js')
const processRelations = require('./process-relations.js')
const utils = require('./utils.js')

const print = (labels, relations) => {
  console.log(`digraph {
rankdir=LR`)
  for (const [id, label] of Object.entries(labels)) {
    console.log(`${id}[label="${label}"]`)
  }
  for (const { source, target } of relations) {
    console.log(`${source} -> ${target}`)
  }
  console.log('}')
}

const main = async (argv) => {
  const ipfsPath = process.env.IPFS_PATH
  if (ipfsPath === undefined) {
    throw Error('`IPFS_PATH` needs to be defined')
  }
  const rootCid = new CID(argv[2])
  const ipld = await utils.openIpld(ipfsPath)

  const rawRelations = getRelations(ipld, rootCid)
  const { labels, relations } = await processRelations(ipld, rawRelations)
  print(labels, relations)
}

main(process.argv).catch((error) => {
  console.error(error)
})
