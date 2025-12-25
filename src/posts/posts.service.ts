import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from 'src/schemas/post.schema';
import { Model } from 'mongoose';
import { createPostDto } from './dtos/createPost.dto';
import { User } from 'src/schemas/user.schemas';
@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<Post>,
  ) {}

  async createPost({ userId, ...createPostDto }: createPostDto) {
    const findUser = await this.userModel.findById(userId);
    if (!findUser) throw new HttpException('User not found', 404);
    const newPost = new this.postModel(createPostDto);
    const savedPost = await newPost.save();
    await findUser.updateOne({ $push: { posts: savedPost._id } });
    return savedPost;
  }
}
