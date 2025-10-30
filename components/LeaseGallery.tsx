export default function LeaseGallery({ images }: { images: string[] }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {images.map((src, i) => (
        <img key={i} src={src} className="w-full h-40 object-cover rounded" />
      ))}
    </div>
  )
}
