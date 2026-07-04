type ProfileImageModalProps = {
  isOpen: boolean,
  onClose: () => void,
  profileImage: string | null,
  onChangePhoto: () => void,
  onDeletePhoto: () => void,
}

const ProfileImageModal = ({ isOpen, onClose, profileImage, onChangePhoto, onDeletePhoto }: ProfileImageModalProps) => {

  if (!isOpen) {
    return null
  }
  
  return (
    <div onClick={onClose} className="flex justify-center items-center fixed inset-0 bg-black/70 z-50">
      <div onClick={(e) => e.stopPropagation()} className="flex flex-col justify-center gap-3 bg-gray-800 rounded-lg p-3 w-full max-w-sm">

        <div className="flex justify-end">
          <button onClick={onClose} className="border-2 rounded-md p-1 text-xl min-w-9">X</button>
        </div>

        <div className="flex justify-center">
          {profileImage ? (
            <img src={profileImage} alt="profileImg"
              className="min-h-44 min-w-44 object-cover rounded-full"
            />
          ) : (
            <div className="flex justify-center items-center w-44 h-44 rounded-full bg-amber-400 text-6xl">
              ?
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center items-center gap-3">
          <button onClick={onChangePhoto} className="w-full max-w-36 p-1 border border-amber-400 rounded-md duration-100 hover:scale-105">Change photo</button>
          <button onClick={onDeletePhoto} className="w-full max-w-36 p-1 border border-red-500 rounded-md text-red-500 duration-100 hover:scale-105">Delete photo</button>
        </div>

      </div>
    </div>
  );
}

export default ProfileImageModal;