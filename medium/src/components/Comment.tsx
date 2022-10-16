import React from "react";
import { Commet } from "../types/typing";

function Comment({ comment }: { comment: Commet }) {
  return (
    <div>
      <p className="">
        <span className="text-yellow-500">{comment.name}:</span>
        {comment.comment}
      </p>
    </div>
  );
}

export default Comment;
