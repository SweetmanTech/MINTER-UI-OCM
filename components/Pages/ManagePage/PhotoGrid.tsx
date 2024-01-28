const PhotoGrid = ({ photos, selectedPhoto, setSelectedPhoto }) => {
  const handlePhotoClick = (src) => {
    setSelectedPhoto(src)
  }

  const handleKeyDown = (e, src) => {
    // For example, trigger click on 'Enter' key
    if (e.key === "Enter") {
      handlePhotoClick(src)
    }
  }

  return (
    <div className="grid grid-cols-3 gap-4 w-full p-3">
      {photos.map((src) => (
        // eslint-disable-next-line react/jsx-key
        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e) => handleKeyDown(e, src)}
          onClick={() => handlePhotoClick(src)}
          className={`w-full h-32 object-cover rounded-md ${
            selectedPhoto === src ? "border-4 border-blue-500" : ""
          }`}
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
