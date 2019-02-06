'use strict'

// Get relations between CIDs and print those in a useful way

const CID = require('cids')

const getRelations = require('./get-relations.js')
const utils = require('./utils.js')

const processRelations = async (ipld, relations, processFun) => {
  for await (const cids of relations) {
    const [baseNode, linkedNode] = await ipld.get(cids).all()
    //console.log(baseNode, linkedNode)
    //console.log(cids)
    const baseOutput = processFun(cids[0], baseNode)
    const linkedOutput = processFun(cids[1], linkedNode)
    console.log(baseOutput, '->', linkedOutput)
  }
}

// A function that is used to process the relations. The returned value
// is used as output.
// Display the value of the `id` field if there is one, else the CID of the
// block
const processFun = (cid, node) => {
  if ('id' in node) {
    return node.id
  } else {
    return cid.toBaseEncodedString()
  }
}

const main = async (argv) => {
  const ipfsPath = process.env.IPFS_PATH
  if (ipfsPath === undefined) {
    throw Error('`IPFS_PATH` needs to be defined')
  }
  const rootCid = new CID(argv[2])
  const ipld = await utils.openIpld(ipfsPath)

  const relations = getRelations(ipld, rootCid)
  console.log(`digraph {
rankdir=LR`)
  await processRelations(ipld, relations, processFun)
  console.log('}')
}

if (require.main === module) {
  main(process.argv).catch((error) => {
    console.error(error)
  })
}