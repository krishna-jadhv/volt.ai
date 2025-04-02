import { v } from "convex/values"
import { mutation, query } from "./_generated/server"; 

// CreateUser Mutation
export const CreateUser = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        picture: v.string(),
        uid: v.string()
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.query('users').filter((q) => q.eq(q.field('email'), args.email)).collect();
        console.log(user);

        if (user?.length == 0) {
            const result = await ctx.db.insert('users', {
                name: args.name,
                picture: args.picture,
                email: args.email,
                uid: args.uid
            });
            console.log(result);
        }
    }
});

// GetUser Query (Fixed)
export const GetUser = query({  // Fixed 'quer' to 'query'
    args: { email: v.string() },  // Fixed missing v.string()
    handler: async (ctx, args) => {
        const user = await ctx.db.query('users')
            .filter((q) => q.eq(q.field('email'), args.email))
            .collect();
        return user[0]; // Return first matching user
    }
});
