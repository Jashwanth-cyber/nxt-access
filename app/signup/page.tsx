"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        const res = await fetch("/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, name, password }),
        });
        if (res.ok) {
            alert("Signup successful! You can now log in.");
        } else {
            let data = null;
            try { data = await res.json(); } catch {}
            setError(data?.error || "Signup failed");
        }
    };

    return (
        <div className="h-screen flex justify-center flex-col p-2 ">
            <div className="flex justify-center">
                <form onSubmit={handleSubmit} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
                    <div>
                        <div className="px-16 py-3">
                            <Image src="https://res.cloudinary.com/dxjna0dxi/image/upload/v1747804762/Screenshot_2025-05-21_104616_tcsbrz.png" alt="Login Image" width={500} height={300} />
                        </div>
                        <div className="pt-2">
                            <LabelledInput
                                label="EMAIL"
                                placeholder="xyz@gmail.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <LabelledInput
                                label="NAME"
                                placeholder="Your Name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                            <LabelledInput
                                label="PASSWORD"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <div className="flex items-center mt-2">
                                <input
                                    id="show-password"
                                    type="checkbox"
                                    checked={showPassword}
                                    onChange={() => setShowPassword(!showPassword)}
                                    className="mr-2"
                                />
                                <label htmlFor="show-password" className="text-sm text-gray-600 select-none">Show password</label>
                            </div>
                            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

                            <button type="submit" className="mt-8 w-full text-white bg-blue-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Register Now</button>
                            <p className="mt-4 text-center text-sm text-gray-600">
                                Already have an account?
                                <Link href="/signin" className="text-blue-800 underline">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({ label, placeholder, type, value, onChange }: LabelledInputType) {
    return <div>
        <label className="block mb-2 text-sm text-gray-500 font-semibold pt-4">{label}</label>
        <input
            type={type || "text"}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder={placeholder}
            required
            value={value}
            onChange={onChange}
        />
    </div>
}

