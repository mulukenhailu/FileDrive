import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const createFile = mutation({
  args: { name: v.string() },
  handler: async (ctx, args) => {

    const identity = await ctx.auth.getUserIdentity();
    if (!identity){
      throw new ConvexError("you must be loge in to add data");

    }
  
    await ctx.db.insert("files", 
        { 
            name: args.name 
        }
    );
    ;
  },
});

export const getFiles = query({
  args:{},
  handler:async(ctx, args)=>{
    return ctx.db.query("files").collect();
  }
})