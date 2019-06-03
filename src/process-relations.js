'use strict'

const processRelations = async (ipld, relations, processFun) => {
  // Key is the node ID, the value is the label
  const labels = {}
  // List of relations, where every object has a `source` and `target` field
  const processedRelations = []
  for await (const cids of relations) {
    const [baseNode, linkedNode] = await ipld.getMany(cids).all()
    const baseOutput = processFun(cids[0], baseNode)
    const linkedOutput = processFun(cids[1], linkedNode)
    const baseOutputAscii = baseOutput.replace(/[^a-zA-Z0-9]/g, '')
    const linkedOutputAscii = linkedOutput.replace(/[^a-zA-Z0-9]/g, '')
    labels[baseOutputAscii] = baseOutput
    labels[linkedOutputAscii] = linkedOutput
    processedRelations.push({
      source: baseOutputAscii,
      target: linkedOutputAscii
    })
  }
  return {
    labels,
    relations: processedRelations
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

module.exports = async (ipld, relations) => {
  return processRelations(ipld, relations, processFun)
}
