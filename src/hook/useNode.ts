import { isBefore } from "react-datepicker/dist/date_utils";
import { CommentType, NestedCommentsType } from "../constants/FeedTypes";

const useNode = () => {

  const insertNode = (tree: NestedCommentsType, commentId: string, item: CommentType) => {
    if (tree.id === commentId) {
      tree.items.push({
        id: item._id,
        comment: item,
        items: []
      })
      return tree
    }

    let latestNode = []
    latestNode = tree.items.map((obj): NestedCommentsType => {
      return insertNode(obj, commentId, item)
    })

    return { ...tree, items: latestNode }
  }

  return { insertNode };
};

export default useNode;
