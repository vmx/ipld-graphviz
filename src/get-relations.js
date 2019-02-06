'use strict'

const promisify = require('util').promisify

const CID = require('cids')
const RecursiveIterator = require('recursive-iterator')

const utils = require('./utils.js')

// Gets all CIDs a node is linking to
const getAllCids = async function* (ipld, cid) {
  const node = await ipld.get([cid]).first()
  for(const item of new RecursiveIterator(node)) {
    const value = item.node
    if (CID.isCID(value)) {
      yield value
    }
  }
}

// Return the relations between nodes. It's an async iterator with a
// two-element array inside containing the CIDs that form a relation.
// First element is the CID that contains the link to the other CID.
const getRelations = async function* (ipld, rootCid) {
  // CIDs that still need to be visited
  const queue = [rootCid]
  // The relations that are returned
  const relations = []

  while (queue.length > 0) {
    const cid = queue.shift()
    const linkedCids = await getAllCids(ipld, cid)
    for await (const linkedCid of linkedCids) {
      yield [cid, linkedCid]
      queue.push(linkedCid)
    }
  }

  return relations
}

const main = async (argv) => {
  const ipfsPath = process.env.IPFS_PATH
  if (ipfsPath === undefined) {
    throw Error('`IPFS_PATH` needs to be defined')
  }
  const rootCid = new CID(argv[2])
  const ipld = await utils.openIpld(ipfsPath)

  const relations = getRelations(ipld, rootCid)
  for await (const [cid, linkedCid] of relations) {
    console.log(
      cid.toBaseEncodedString(),
      '->',
      linkedCid.toBaseEncodedString()
    )
  }
}

if (require.main === module) {
  main(process.argv).catch((error) => {
    console.error(error)
  })
}

module.exports = getRelations
