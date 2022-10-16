import React from "react";
import PortableText from "react-portable-text";
import { urlFor } from "../config/sanity";
import { Post } from "../types/typing";

function Card({ post }: { post: Post }) {
  return (
    <article className="max-w-3xl mx-auto p-5">
      <h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
      <h2 className="text-xl font-light text-gray-500">{post.description}</h2>
      <div className="flex items-center space-x-2">
        <img
          className="h-10 w-10 rounded-full"
          src={urlFor(post.author.image).url()!}
          alt={post.author.name}
        />
        <p className="font-exttralight text-sm">
          Blog post by{" "}
          <span className="text-green-600">{post.author.name}</span> - Published
          at {new Date(post._createdAt).toLocaleString()}
        </p>
      </div>
      <div className="mt-1">
        <PortableText
          dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
          content={post.body}
          serializers={{
            h1: (props: any) => (
              <h1 className="text-2xl font-bold my-5" {...props} />
            ),
            h2: (props: any) => (
              <h1 className="text-xl font-bold my-5" {...props} />
            ),
            li: (props: any) => <h1 className="ml-4 list-disc" {...props} />,
            link: (props: any) => (
              <h1 className="text-blue-500 hover:underline" {...props} />
            ),
          }}
        />
      </div>
    </article>
  );
}

export default Card;
