import Button from "./Button";
import MDXImage from "./MDXImage";

const shortcodes = {
  Button,
  Image: MDXImage, // 기존 Image를 커스텀 MDXImage로 교체
};

export default shortcodes;