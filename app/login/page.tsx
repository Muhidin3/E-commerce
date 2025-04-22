"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

export default function LoginPage() {
  redirect('/auth/login')
  const [username, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false, // Prevent automatic redirection
    });

    console.log(result)
    if (result?.error) {
      alert("Login failed: " + result.error);
    } else {
      router.push("/dashboard"); // Redirect on successful login
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">username</label><br/>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="block bg-red-300 text-2xl cursor-pointer">Login</button>
      </form>
    </div>
  );
}
