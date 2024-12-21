import { type PaginateOptions } from 'mongoose';

import { OkResponse } from '@/core/success.response';
import postModel from '@/models/post.model';

type OptionQuery = {
  page: number;
  limit: number;
  order: 'asc' | 'desc';
};

export class PostService {
  async getPosts({
    page = 1,
    limit = 20,
    order = 'asc',
  }: Partial<OptionQuery>) {
    const options: PaginateOptions = {
      page,
      limit,
      sort: { createdAt: order },
      populate: 'author',
    };

    const posts = await postModel.paginate({}, options);

    return new OkResponse('Successfully!', {
      posts,
    });
  }

  deletePost() {}

  updatePost() {}

  createPost() {}

  findPost() {}
}
