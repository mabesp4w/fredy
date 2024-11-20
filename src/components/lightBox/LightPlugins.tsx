/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */

import { Dispatch, FC, SetStateAction } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Captions, Thumbnails } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";

type Props = {
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  slides: any;
};

const LightPlugins: FC<Props> = ({ index, setIndex, slides }) => {
  return (
    <Lightbox
      index={index}
      slides={slides}
      open={index >= 0}
      close={() => setIndex(-1)}
      plugins={[Thumbnails, Captions]}
    />
  );
};

export default LightPlugins;
