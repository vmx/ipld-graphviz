'use strict'

const promisify = require('util').promisify

const IpfsBlockService = require('ipfs-block-service')
const IpfsRepo = require('ipfs-repo')
const Ipld = require('ipld')

const openIpld = promisify((ipfsRepoPath, callback) => {
  const repo = new IpfsRepo(ipfsRepoPath)
  repo.open((err) => {
    if (err) {
      callback(err)
    }
    const blockService = new IpfsBlockService(repo)
    const ipld = new Ipld({ blockService })
    callback(null, ipld)
  })
})

module.exports = {
  openIpld
}
