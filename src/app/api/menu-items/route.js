import {isAdmin} from "@/app/api/auth/[...nextauth]/route";
import {MenuItem} from "@/models/MenuItem";
import mongoose from "mongoose";

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();

  if (await isAdmin()) {
    try {      
      if (!mongoose.Types.ObjectId.isValid(data.category)) {
        return new Response(JSON.stringify({ error: "Invalid category ID" }), { status: 400 });
      }

      const menuItemDoc = await MenuItem.create(data);
      return Response.json(menuItemDoc);
    } catch (error) {
      console.error("Error creating menu item:", error); 
      return new Response(JSON.stringify({ error: "Failed to create menu item" }), { status: 500 }); 
    }
  } else {
    return new Response(JSON.stringify({}), { status: 403 }); 
  }
}

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  if (await isAdmin()) {
    try {
      const {_id, category, ...data} = await req.json();

      if (category && !mongoose.Types.ObjectId.isValid(category)) {  
        return new Response(JSON.stringify({ error: "Invalid category ID" }), { status: 400 });
      }

      await MenuItem.findByIdAndUpdate(_id, data);
      return Response.json({ success: true }); 
    } catch (error) {
      console.error("Error updating menu item:", error);
      return new Response(JSON.stringify({ error: "Failed to update menu item" }), { status: 500 });
    }
  }
  return new Response(JSON.stringify({}), { status: 403 });
}

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  return Response.json(
    await MenuItem.find()
  );
}

export async function DELETE(req) {
  mongoose.connect(process.env.MONGO_URL);
  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');

  if (await isAdmin()) {
    try {
      if (!mongoose.Types.ObjectId.isValid(_id)) {
        return new Response(JSON.stringify({ error: "Invalid menu item ID" }), { status: 400 });
      }
      const result = await MenuItem.findByIdAndDelete(_id);
      if (!result) {
        return new Response(JSON.stringify({ error: "Menu item not found" }), { status: 404 }); // Item not found
      }
      return Response.json({ success: true });
    } catch (error) {
      console.error("Error deleting menu item:", error);
      return new Response(JSON.stringify({ error: "Failed to delete menu item" }), { status: 500 });
    }
  }
    return new Response(JSON.stringify({}), { status: 403 });
}