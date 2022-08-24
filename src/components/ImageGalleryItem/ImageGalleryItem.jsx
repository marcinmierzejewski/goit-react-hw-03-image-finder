export const ImageGalleryItem = ({webformatURL, largeImageURL }) => {
  return (
    <li>
      <img src={webformatURL} alt="" data-source={largeImageURL} />
    </li>
  )
}