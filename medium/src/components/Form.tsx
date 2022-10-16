import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Post } from "../types/typing";

type TFormInput = {
  _id: string;
  name: string;
  email: string;
  comment: string;
};

function Form({ post }: { post: Post }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormInput>();
  const [submitted, setSubmitted] = useState<boolean>(false);

  const onSubmit: SubmitHandler<TFormInput> = (data) => {
    fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((data) => {
        console.log("data", data);
        setSubmitted(true);
      })
      .catch((err) => {
        console.log("err", err);
        setSubmitted(false);
      });
  };

  return submitted ? (
    <div className="flex flex-col p-10 my-10 bg-yellow-500 text-white max-w-2xl mx-auto">
      <h3 className="text-3xl font-bold">Thank you for submitting your comment!</h3>
      <p>Once it has been approved, it will appear below</p>
    </div>
  ) : (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col p-5 max-w-2xl mx-auto mb-10"
    >
      <h3 className="text-sm text-yellow-500">Enjoyed this article ?</h3>
      <h4 className="text-3xl font-bold">Leave a comment below!</h4>
      <hr className="py-3 mt-2" />
      <input {...register("_id")} type="hidden" name="_id" value={post._id} />
      <label htmlFor="name" className="block mb-5">
        <span className="text-gray-700">Name</span>
        <input
          {...register("name", { required: true })}
          placeholder="..."
          type="text"
          className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 focus:ring outline-none"
        />
      </label>
      <label htmlFor="email" className="block mb-5">
        <span className="text-gray-700">Email</span>
        <input
          {...register("email", { required: true })}
          placeholder="..."
          type="email"
          className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 focus:ring outline-none"
        />
      </label>
      <label htmlFor="comment" className="block mb-5">
        <span className="text-gray-700">Comment</span>
        <textarea
          {...register("comment", { required: true })}
          placeholder=""
          rows={8}
          className="shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 outline-none focus:ring"
        />
      </label>
      {/* erros */}
      <div className="flex flex-col p-5">
        {errors.name && (
          <span className="text-red-500">The Name Field is required</span>
        )}
        {errors.comment && (
          <span className="text-red-500">The Comment Field is required</span>
        )}
        {errors.email && (
          <span className="text-red-500">The Email Field is required</span>
        )}
      </div>
      <input
        type="submit"
        className="shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer"
      />
    </form>
  );
}

export default Form;
