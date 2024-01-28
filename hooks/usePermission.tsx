const usePermission = (collectionContract) => {
  const isAdminOrRole = async (user, tokenId, role) => {
    if (!collectionContract) return false
    const response = await collectionContract.isAdminOrRole(user, tokenId, role)
    return response
  }

  return { isAdminOrRole }
}

export default usePermission
