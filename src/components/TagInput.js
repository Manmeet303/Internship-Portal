/**
 * Edited By Malay (Dont Change)
 */
import { useState } from "react";
const TagsInput = (props) => {
    const [tags, setTags] = useState(props.tags);
    const removeTags = (indexToRemove) => {
        setTags([...tags.filter((_, index) => index !== indexToRemove)]);
    };
    const addTags = (event) => {
        if (event.target.value !== "") {
            setTags([...tags, event.target.value]);
            props.setState([...tags, event.target.value]);
            event.target.value = "";
        }
    };
    return (
        <div className="TagInput">
            <ul id="Tags">
                {tags.map((tag, index) => (
                    <li key={index} className="Tag">
                        <span className="TagData">{tag}</span>
                        <span
                            className="TagRemove"
                            onClick={() => removeTags(index)}
                        >
                            x
                        </span>
                    </li>
                ))}
            </ul>

            <input
                type="text"
                onKeyUp={(event) =>
                    event.key === "Enter" ? addTags(event) : null
                }
                placeholder={props.placeholder}
            />
        </div>
    );
};
export default TagsInput;
