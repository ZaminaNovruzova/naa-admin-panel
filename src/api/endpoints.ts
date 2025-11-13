interface IEndpoints {
  [key: string]: string;
}

const endpoints: IEndpoints = {
  get_all_posts: "posts",
  get_single_post: "posts",
   put_single_post: "posts",
};

const $api = (key: keyof IEndpoints) => {
  return endpoints[key];
};

export default $api;
