import css from "./ImageCard.module.css"
export default function ImageCard({ item, onClick }) {
  return (
    <div onClick={() => onClick(item)}>
      <img
        className={css.img}
        src={item.urls.small}
        alt={item.alt_description}
        width={300}
        height={200}
      />
    </div>
  );
}
