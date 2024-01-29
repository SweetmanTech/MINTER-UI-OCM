const PhotoGrid = ({ photos, selectedPhoto, setSelectedPhoto, isSelectedAdmin }) => {
  const handlePhotoClick = (src) => {
    setSelectedPhoto(src)
  }

  const handleKeyDown = (e, id) => {
    // For example, trigger click on 'Enter' key
    if (e.key === "Enter") {
      handlePhotoClick(id)
    }
  }

  const getBorderClass = (id) => {
    if (selectedPhoto === id) {
      return isSelectedAdmin ? "border-4 border-green-500" : "border-4 border-yellow-500"
    }
    return ""
  }

  return (
    <div className="grid grid-cols-3 gap-4 w-full p-3">
      {photos.map((src, id) => (
        // eslint-disable-next-line react/jsx-key
        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e) => handleKeyDown(e, id)}
          onClick={() => handlePhotoClick(id)}
          className={`w-full h-32 object-cover rounded-md ${getBorderClass(id)}`}
          style={{
            aspectRatio: "200/200",
            objectFit: "cover",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Zora Creator Drop"
            className="w-full h-full object-cover rounded-md"
            height="200"
            src={src}
            style={{
              aspectRatio: "200/200",
              objectFit: "cover",
            }}
            width="200"
          />
        </div>
      ))}
    </div>
  )
}

export default PhotoGrid
