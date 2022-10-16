import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import React from "react";
import { sanityClient, urlFor } from "../../config/sanity";
import { Post } from "../../types/typing";
import Card from "../../components/Card";
import Form from "../../components/Form";
import Comment from "../../components/Comment";

interface Props {
  post: Post;
}

function Post({ post }: Props) {
  return (
    <main>
      <img
        className="w-full h-40 object-cover"
        src={urlFor(post.mainImage).url()!}
        alt={post.title}
      />
      <Card post={post} />
      <hr className="max-w-lg my-5 mx-auto border border-yellow-500" />
      <Form post={post} />
      <div className="flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-yellow-500 shadow space-x-2">
        <h3 className="text-4xl">Comments</h3>
        <hr className="pb-2" />
        {post.comments.map((comment) => {
          return <Comment comment={comment} key={comment._id} />;
        })}
      </div>
    </main>
  );
}

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `*[_type == "post"]{
        _id, 
        slug {
          current
        }
      }`;

  const posts = await sanityClient.fetch(query);
  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const query = `*[_type == "post" && slug.current == "my-first-post"][0]{
    _id,
    _createdAt,
    title,
    author -> {
    name,
    image
  },
  'comments': *[
    _type=="comment" &&
    post._ref == ^._id &&
    approved == true],
  description,
  mainImage,
  slug,
  body
  }`;

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};
