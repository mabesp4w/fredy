/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */

import { BASE_URL } from "@/services/baseURL";

interface PathObject {
  path: string;
}

interface Props {
  data: any;
  picture: string;
  title: string | PathObject;
  description: string | PathObject;
  width?: number;
  height?: number;
}

// Helper function to resolve the title and description
const resolveValue = (row: any, key: string | PathObject): any => {
  if (typeof key === "string") {
    return key;
  } else if (typeof key === "object" && "path" in key) {
    // Assuming the key is a path to the value in row
    return row[key.path];
  }
  return "";
};

const lightImgDB = ({
  data,
  picture,
  title,
  description,
  width,
  height,
}: Props) => {
  const dtImages = data?.map((row: any) => {
    return {
      src: `${BASE_URL}/${row[picture]}`,
      title: resolveValue(row, title),
      description: resolveValue(row, description),
      width: width || 3840,
      height: height || 5760,
    };
  });
  return dtImages;
};

export default lightImgDB;
