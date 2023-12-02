import { writeFileSync } from "fs";
import { allPosts } from "@/.contentlayer/generated"; //TODO

// const tagRecord2 = {
//   "github" : ["file1", "file2", "file3"],
//   "markdown" : ["file2", "file3", "file4"],
// }

export default function createCategoryIndex() {
  const categoryRecord = {};
  allPosts.forEach((file) => {
    if (file.category in categoryRecord) {
      categoryRecord[file.category].push(file.filePath);
    } else {
      categoryRecord[file.category] = [];
      categoryRecord[file.category].push(file.filePath);
    }
  });

  writeFileSync("./lib/category-files.json", JSON.stringify(categoryRecord));
  console.log("created category index")
}
