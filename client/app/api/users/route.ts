// app/api/users/route.ts
import { User } from "@/types/user";
import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL;

// Create User
export async function createUser(userData: User) {
  try {
    const response = await fetch(`${BACKEND_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: response.status }
      );
    }

    const newUser = await response.json();
    return NextResponse.json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}

// List Users
export async function listUsers() {
  try {
    const response = await fetch(`${BACKEND_URL}/users`);
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch users" },
        { status: response.status }
      );
    }

    const users = await response.json();
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Error fetching users" }, { status: 500 });
  }
}

// Get User by ID
export async function getUserById(id: string) {
  try {
    const response = await fetch(`${BACKEND_URL}/users/${id}`);
    if (!response.ok) {
      return NextResponse.json(
        { error: "User not found" },
        { status: response.status }
      );
    }

    const user = await response.json();
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Error fetching user" }, { status: 500 });
  }
}

// Update User
export async function updateUser(id: string, updateData: any) {
  try {
    const response = await fetch(`${BACKEND_URL}/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to update user" },
        { status: response.status }
      );
    }

    const updatedUser = await response.json();
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Error updating user" }, { status: 500 });
  }
}
