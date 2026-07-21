function PhotoCard({ title, image }) {
  return (
    <div className="w-full border border-white/20 rounded-[10px] ronded-[20px] overflow-hidden relative">
      <div className="w-full aspect-[16/9] bg-white/10">
        {image && (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        )}
      </div>

      <p className="absolute bottom-6 left-5.5 md:bottom-7 md:left-7 lg:bottom-13 lg:left-11 text-white text-[14px] lg:text-[28px] font-[600] lg:font-[700]">
        {title}
      </p>
    </div>
  );
}

function Photo({ photos }) {
  return (
    <div className="px-5 md:px-15 lg:px-45">
      <p className="text-blue-primary text-[12px] lg:text-[24px] font-[400] lg:font-[500] leading-normal tracking-[0%] mb-2 lg:mb-4">
        Photo
      </p>
      <p className="text-white text-[18px] md:text-[20px] lg:text-[38px] font-[700] leading-normal md:leading-[150%] tracking-[0%] mb-8 lg:mb-20">
        UNIS 활동사진
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {photos.map((photo) => (
          <PhotoCard
            key={photo.photoId}
            title={photo.label}
            image={photo.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default Photo;
