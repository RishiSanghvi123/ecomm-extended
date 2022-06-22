import DirectoryItem from "../directory-item/directory-item.component";
import "./directory.styles.scss";

const Directory = ({ categories }) => {
  console.log(categories);
  return (
    <div className="directory-container">
      {categories.map(({ id, title, imageUrl, route }) => (
        <DirectoryItem
          key={id}
          title={title}
          imageUrl={imageUrl}
          route={route}
        />
      ))}
    </div>
  );
};

export default Directory;
