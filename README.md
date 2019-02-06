# IPLD Graphviz

> Visualise your IPLD DAG with Graphviz.


## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)


## Install

```sh
> git clone https://github.com/vmx/ipld-graphviz.git
> cd ipld-graphviz
> npm install
```


## Usage

### Output the DAG rooted in a CID

```console
> IPFS_PATH=/tmp/dagbuilderrepo npx . zdpuAmu84NmMhcp31RRBHEr5EEXzYziav44xbPASvB7HC2Xtb
digraph {
rankdir=LR
root -> anotherSibling
root -> child
root -> childsibling
anotherSibling -> bar
child -> zb2rhaDj14xPxcixuRa4GatsXUVRXhPufHqhPWUFmKp3xftVx
child -> zb2rhd4xj9YjrdNbjQiE1cp7Uhy5i9jm6C9Uej3Bckb1S37ez
childsibling -> anotherChild
childsibling -> zb2rhd4xj9YjrdNbjQiE1cp7Uhy5i9jm6C9Uej3Bckb1S37ez
childsibling -> zb2rhbGwE5yJZjN1THD9cy96KGocL6dSRkvLAtWiRCqy5H5tb
anotherChild -> deepernested
}
```

The output is a [Graphviz](https://graphviz.org/) file that can be converted to image files:

```console
> IPFS_PATH=/tmp/dagbuilderrepo npx . zdpuAmu84NmMhcp31RRBHEr5EEXzYziav44xbPASvB7HC2Xtb > out.gv
> dot -Tpng out.gv > out.png
> dot -Tsvg out.gv > out.svg
```

## Contribute

Feel free to join in. All welcome. Open an [issue](https://github.com/vmx/ipld-graphviz/issues)!

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.


## License

[MIT](LICENSE) Copyright © Protocol Labs, Inc.

