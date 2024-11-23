import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createUser = mutation({
  args: {
    email: v.string(),
    username: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    if(user?.length == 0){
        await ctx.db.insert('users', {
            email:args.email,
            username:args.username,
            imageUrl: args.imageUrl
        });

        return "Inserted new user";
    }
    return 'User already exists';
  },
});
