import { z } from 'zod';

const UserSchema = z.object({
    username:z.string().min(4),
    email: z.string().email(),
    password: z.string().min(8)
});
const UserLogin=z.object({
    email:z.string().email(),
    password:z.string()
})

const isRepo = (repo) => {
    const url = 'https://github.com/';
    return repo.startsWith(url);
};

const GithubRepo = z.string().refine(isRepo, {
    message: "Invalid GitHub repository URL",
});

const ReposSchema = z.object({
    repo: GithubRepo
});

export { UserSchema, ReposSchema ,UserLogin};
