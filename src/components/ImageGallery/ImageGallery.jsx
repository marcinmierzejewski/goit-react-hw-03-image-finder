import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import styles from './ImageGallery.module.css'

export const ImageGallery = ({ pictures }) => {
  const  { Gallery } = styles

  return(
    <>
      {pictures.length > 0 ? (
        <ul className={Gallery}>
          {pictures.map(({id, webformatURL, largeImageURL}) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
            />
          ))}
        </ul>
      ) : (
        ''
      )}
    </>
  )
}