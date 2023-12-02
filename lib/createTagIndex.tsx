import GithubSlugger from "github-slugger";
import { writeFileSync } from "fs";


// const tagRecord2 = {
//   "github" : ["file1", "file2", "file3"],
//   "markdown" : ["file2", "file3", "file4"],
// }


export default function createTagIndex(allPosts) {
  const tagRecord = {};
  allPosts.forEach((file) => {
    file.tags.forEach((tag) => {
      const formattedTag = GithubSlugger.slug(tag)
      if (formattedTag in tagRecord) {
        tagRecord[tag].push(file.filePath)
      } else {
        tagRecord[tag] = [];
        tagRecord[tag].push(file.filePath)
        
      }
    });
  });

  writeFileSync("./lib/tag-files.json", JSON.stringify(tagRecord));
}

// export default function createTagIndex(allPosts) {
//   const tagCount: Record<string, number> = {}
//   allPosts.forEach((file) => {
//       file.tags.forEach((tag) => {
//         const formattedTag = GithubSlugger.slug(tag)
//         if (formattedTag in tagCount) {
//           tagCount[formattedTag] += 1
//         } else {
//           tagCount[formattedTag] = 1
//         }
//       })

//   })
//   writeFileSync('./lib/tag-data.json', JSON.stringify(tagCount))
// }
