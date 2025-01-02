// import React from "react";
// import fs from "fs";
// import matter from "gray-matter";
// import rehypeDocument from "rehype-document";
// import rehypeFormat from "rehype-format";
// import rehypeStringify from "rehype-stringify";
// import remarkParse from "remark-parse";
// import remarkRehype from "remark-rehype";
// import { unified } from "unified";
// import rehypePrettyCode from "rehype-pretty-code";
// import { transformerCopyButton } from "@rehype-pretty/transformers";
// import rehypeAutolinkHeadings from 'rehype-autolink-headings'
// import rehypeSlug from 'rehype-slug'
// // import OnThisPage from "@/components/onThisPage";
// import OnThisPage from "../../../components/onThisPage";

// const Page = async ({ params }) => {
//   // console.log(await params)
//   const slug = (await params).slug;
//   const filepath = `content/${slug}.md`;
//   // console.log(filepath)

//   if (!fs.existsSync(filepath)) {
//     // notFound();
//     return;
//   }

//   const file = await unified()
//     .use(remarkParse)
//     .use(remarkRehype)
//     .use(rehypeDocument, { title: "👋🌍" })
//     .use(rehypeFormat)
//     .use(rehypeStringify)
//     .use(rehypeAutolinkHeadings)
//     .use(rehypeSlug)
//     .use(rehypePrettyCode, {
//       transformers: [
//         transformerCopyButton({
//           visibility: "always",
//           feedbackDuration: 3_000,
//         }),
//       ],
//     });

//   const fileContent = fs.readFileSync(filepath, "utf-8");
//   // console.log(fileContent)
//   const { content, data } = matter(fileContent);
//   // const htmlContent=content
//   const res = (await file.process(content)).toString();
//   // console.log(res)
//   const htmlContent = res;

//   return (
//     <>
//     {/* <div className="max-w-fit flex flex-col-reverse sm:mt-16 md:flex-row lg:gap-8 2xl:gap-28 mx-auto">

//       <div className="sm:mx-auto p-6 max-w-6xl min-h-screen">
//         <div className="bg-white mt-16 sm:mt-0 shadow-md rounded-lg p-6 w-full max-w-3xl mb-6">
//           <p className="text-xl italic text-gray-700 text-center">
//             "{data.title}"
//           </p>
//           <p className="text-right text-gray-500 mt-2">— {data.author}</p>
//         </div>

//         <div className="shadow-md rounded-lg p-6 w-full max-w-3xl"> */}
//           {/* <p className="text-gray-600 leading-7">{htmlContent}</p> */}
//           {/* <div
//             dangerouslySetInnerHTML={{ __html: htmlContent }}
//             className="prose dark:prose-invert "
//           ></div>
//         </div>
//       </div>
//       <OnThisPage htmlcontent={htmlContent}/>
//     </div> */}
//     <div className="max-w-screen-xl mx-auto flex flex-col-reverse sm:mt-16 md:flex-row lg:gap-8 2xl:gap-28">
//   {/* Main Content Section */}
//   <div className="flex-1 p-6">
//     {/* Blog Title Section */}
//     <div className="bg-white shadow-md mt-8 sm:mt-0 rounded-lg p-6 w-full max-w-3xl mx-auto mb-6">
//       <p className="text-xl italic text-gray-700 text-center">
//         "{data.title}"
//       </p>
//       <p className="text-right text-gray-500 mt-2">— {data.author}</p>
//     </div>

//     {/* Blog Content Section */}
//     <div className="shadow-md rounded-lg p-6 w-full max-w-3xl mx-auto">
//       <div
//         dangerouslySetInnerHTML={{ __html: htmlContent }}
//         className="prose dark:prose-invert"
//       ></div>
//     </div>
//   </div>

//   {/* Sidebar Section */}
//   <div className="w-full max-w-xs md:max-w-sm lg:max-w-md">
//     <OnThisPage htmlcontent={htmlContent} />
//   </div>
// </div>

//     </>
//   );
// };

// export default Page;

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import rehypePrettyCode from "rehype-pretty-code";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import OnThisPage from "../../../components/onThisPage";

// Fetch all blog posts' slugs at build time
export async function getStaticPaths() {
  const files = fs.readdirSync(path.join(process.cwd(), "content"));
  const paths = files.map(file => ({
    params: { slug: file.replace(".md", "") }, // remove the .md extension
  }));

  return {
    paths,
    fallback: false,
  };
}

// Fetch blog post data based on the slug at build time
export async function getStaticProps({ params }) {
  const { slug } = params;
  const filepath = path.join(process.cwd(), "content", `${slug}.md`);

  if (!fs.existsSync(filepath)) {
    return { notFound: true };
  }

  const fileContent = fs.readFileSync(filepath, "utf-8");
  const { content, data } = matter(fileContent);

  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeDocument, { title: "👋🌍" })
    .use(rehypeFormat)
    .use(rehypeStringify)
    .use(rehypeAutolinkHeadings)
    .use(rehypeSlug)
    .use(rehypePrettyCode, {
      transformers: [
        transformerCopyButton({
          visibility: "always",
          feedbackDuration: 3_000,
        }),
      ],
    });

  const res = await file.process(content);
  const htmlContent = res.toString();

  return {
    props: {
      post: { htmlContent, data },
    },
  };
}

const Page = ({ post }) => {
  const { htmlContent, data } = post;

  return (
    <div className="max-w-screen-xl mx-auto flex flex-col-reverse sm:mt-16 md:flex-row lg:gap-8 2xl:gap-28">
      {/* Main Content Section */}
      <div className="flex-1 p-6">
        {/* Blog Title Section */}
        <div className="bg-white shadow-md mt-8 sm:mt-0 rounded-lg p-6 w-full max-w-3xl mx-auto mb-6">
          <p className="text-xl italic text-gray-700 text-center">
            "{data.title}"
          </p>
          <p className="text-right text-gray-500 mt-2">— {data.author}</p>
        </div>

        {/* Blog Content Section */}
        <div className="shadow-md rounded-lg p-6 w-full max-w-3xl mx-auto">
          <div
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            className="prose dark:prose-invert"
          ></div>
        </div>
      </div>

      {/* Sidebar Section */}
      <div className="w-full max-w-xs md:max-w-sm lg:max-w-md">
        <OnThisPage htmlcontent={htmlContent} />
      </div>
    </div>
  );
};

export default Page;

