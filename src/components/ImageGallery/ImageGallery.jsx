import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";

export const ImageGallery = ({ pictures }) => {
  return(
    <div>
      {pictures.length > 0 ? (
        <ul>
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
    </div>
  )
}