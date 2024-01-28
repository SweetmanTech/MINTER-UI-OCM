const useCallSale = (collectionContract) => {
  const callSale = async (tokenId, salesConfig, data) => {
    const tx = await collectionContract.callSale(tokenId, salesConfig, data)
    const receipt = await tx.wait()
    return receipt
  }

  return { callSale }
}

export default useCallSale
