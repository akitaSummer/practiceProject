declare class CreatePostBto {
    title: string;
    content: string;
}
export declare class PostsController {
    index(): Promise<import("@hasezoey/typegoose").DocumentType<import("./post.model").Post>[]>;
    create(createPostBto: CreatePostBto): Promise<{
        success: boolean;
    }>;
    detail(id: string): Promise<import("@hasezoey/typegoose").DocumentType<import("./post.model").Post>>;
    update(id: string, updatePostDto: CreatePostBto): Promise<{
        success: boolean;
    }>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
export {};
