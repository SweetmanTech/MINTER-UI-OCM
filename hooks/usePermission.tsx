const usePermission = (collectionContract) => {
  const isAdminOrRole = async (user, tokenId, role) => {
    if (!collectionContract) return false
    const response = await collectionContract.isAdminOrRole(user, tokenId, role)
    return response
  }

  const addPermission = async (tokenId, user, role) => {
    if (!collectionContract) return false
    const tx = await collectionContract.addPermission(tokenId, user, role)
    const receipt = await tx.wait()
    return receipt
  }

  return { addPermission, isAdminOrRole }
}

export default usePermission
