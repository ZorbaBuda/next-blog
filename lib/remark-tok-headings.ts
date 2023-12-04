import { VFile } from "vfile";
import { Parent } from "unist";
import { visit } from "unist-util-visit";
import { Heading } from "mdast";
import slugger from "github-slugger";
import { toString } from "mdast-util-to-string";
import { remark } from "remark";
import GithubSlugger from "github-slugger";

export type Toc = {
  value: string;
  depth: number;
  url: string;
}[];

/**
 * Extracts TOC headings from markdown file and adds it to the file's data object.
 */
export function remarkTocHeadings() {
  return (tree: Parent, file: VFile) => {
    const toc: Toc = [];
    visit(tree, "heading", (node: Heading) => {
      const textContent = toString(node);
      toc.push({
        value: textContent,
        url: "#" + slugger.slug(textContent),
        depth: node.depth,
      });
    });
    file.data.toc = toc;
  };
}

/**
 * Passes markdown file through remark to extract TOC headings
 *
 * @param {string} markdown
 * @return {*}  {Promise<Toc>}
 */
// export async function extractTocHeadings(markdown: string): Promise<Toc> {
//   const vfile = await remark().use(remarkTocHeadings).process(markdown)
//   // @ts-ignore
//   return vfile.data.toc
// }

export async function extractTocHeadings(markdown: string): Promise<any> {
  const regulrExp = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
  const slugger = new GithubSlugger();
  const headings = Array.from(markdown.matchAll(regulrExp)).map(
    ({ groups }) => {
      const flag = groups?.flag;
      const content = groups?.content;

      return {
        level: flag?.length == 1 ? "one" : flag?.length == 2 ? "two" : "three",
        text: content,
        slug: content ? slugger.slug(content) : undefined,
      };
    }
  );
  return headings;
}
