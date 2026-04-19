import type { ImgHTMLAttributes } from "react";
import LoaderIcon from "../components/louders/logo_excell.svg";

interface Property extends ImgHTMLAttributes<HTMLImageElement> {
  width?: number | string;
}

export default function Loader(props: Property) {
  const { width = 200, style, ...rest } = props;
  const STYLE = {
    width: typeof width === "number" ? `${width}px` : width,
    ...style,
  };

  return <img className="loader" style={STYLE} src={LoaderIcon} {...rest} />;
}
