interface BlogActionType {
  type: string;
  id: number;
  content: string;
}

type Blog = {
  id: number;
  content: string;
};

function BlogReducer(blogs: Array<Blog>, action: BlogActionType) {
  switch (action.type) {
    case "ADD_BLOG": {
      return [
        ...blogs,
        {
          id: action.id,
          content: action.content,
          done: false,
        },
      ];
    }

    case "DELETE_BLOG": {
      return blogs.filter((blog) => blog.id !== action.id);
    }

    case "UPDATE_BLOG": {
      return blogs.map((blog) => {
        if (blog.id === action.id) {
          return {
            ...blog,
            content: action.content,
          };
        }
        return blog;
      });
    }

    default: {
      throw Error("未知 action: " + action.type);
    }
  }
}
