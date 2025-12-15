import { auth, currentUser} from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import {ConvexHttpClient} from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(
    process.env.NEXT_PUBLIC_CONVEX_URL!
);

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(req: Request) {
  const authorization = await auth();
  const user = await currentUser();


  if (!authorization || !user) {
    return new Response("Unauthorized", { status: 403 });
  }
  const {room} = await req.json();
  const board = await convex.query(api.board.get, {id: room});

  console.log("AUTH_INFO",{room, board,boardOrgId:board?.orgId,userOrgId:authorization.orgId});

  if(board?.orgId !== authorization.orgId) return new Response("Unauthorized", { status: 403 });

  const userInfo = {
    name: user.firstName || "Anonymous",
    image: user.imageUrl,
  };


  const session = liveblocks.prepareSession(
    user.id,
    {userInfo}
  );
  if(room){
    session.allow(room,session.FULL_ACCESS)
  }

  const {status, body} = await session.authorize();


  return new Response(body, {status});
  }
// import { auth, currentUser } from "@clerk/nextjs/server";
// import { Liveblocks } from "@liveblocks/node";
// import { ConvexHttpClient } from "convex/browser";
// import { api } from "@/convex/_generated/api";

// const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// const liveblocks = new Liveblocks({
//   secret: process.env.LIVEBLOCKS_SECRET_KEY!,
// });

// export async function POST(req: Request) {
//   // Clerk authentication for API routes
//   const { userId, orgId } = await auth();
//   const user = await currentUser();

//   if (!userId || !user) {
//     return new Response("Unauthorized", { status: 403 });
//   }

//   const { room } = await req.json();
//   if (!room) {
//     return new Response("Missing room", { status: 400 });
//   }

//   // Fetch board from Convex
//   const board = await convex.query(api.boards.get, { id: room });

//   if (!board) {
//     return new Response("Board not found", { status: 404 });
//   }

//   // Must match ORG, not USER
//   if (board.orgId !== orgId) {
//     return new Response("Unauthorized: Org mismatch", { status: 403 });
//   }

//   // Liveblocks user info
//   const userInfo = {
//     name: user.firstName ?? "Anonymous",
//     avatar: user.imageUrl,
//   };

//   // Create session
//   const session = liveblocks.prepareSession(userId, { userInfo });
//   session.allow(room, session.FULL_ACCESS);

//   const { status, body } = await session.authorize();
//   return new Response(body, { status });
// }
