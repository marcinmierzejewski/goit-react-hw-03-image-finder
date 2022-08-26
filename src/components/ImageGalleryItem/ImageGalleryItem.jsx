import styles from './ImageGalleryItem.module.css'

export const ImageGalleryItem = ({webformatURL, largeImageURL }) => {
  const { GalleryItem, GalleryItemImage } = styles

  return (
    <li className={GalleryItem}>
      <img className={GalleryItemImage} src={webformatURL} alt="" data-source={largeImageURL} />
    </li>
  )
}