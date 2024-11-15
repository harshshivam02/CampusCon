import { FaTrash } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Post = ({ post }) => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const isMyPost = authUser?._id === post.owner;
  const { mutate: deletePost } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/post/deletePost/${post._id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete post");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Post deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDeletePost = () => {
    deletePost();
  };

  return (
    <div className="flex gap-4 items-start p-4 border-b border-gray-700 rounded-lg">
      <div className="flex flex-col flex-1">
        <div className="flex gap-3 items-center mb-2">
          <h3 className="font-bold text-white">{post.title}</h3>
          {isMyPost && (
            <span className="flex justify-end flex-1">
              <FaTrash className="cursor-pointer text-gray-500 hover:text-red-500" onClick={handleDeletePost} />
            </span>
          )}
        </div>
        <p className="text-gray-300">{post.description}</p>
        {post.pdflink && (
          <a href={post.pdflink} className="text-blue-500 underline">
            View PDF
          </a>
        )}
      </div>
    </div>
  );
};

export default Post;
