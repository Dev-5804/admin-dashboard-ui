"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { User, UserStatus } from "@/lib/store";

interface UserFormProps {
    user?: User | null;
    onSubmit: (data: Omit<User, "id">) => void;
    onCancel: () => void;
}

export function UserForm({ user, onSubmit, onCancel }: UserFormProps) {
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [status, setStatus] = useState<UserStatus>(user?.status || "Active");
    const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setStatus(user.status);
        } else {
            setName("");
            setEmail("");
            setStatus("Active");
        }
    }, [user]);

    const validate = () => {
        const newErrors: { name?: string; email?: string } = {};
        if (!name.trim()) newErrors.name = "Name is required";
        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Invalid email format";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onSubmit({ name, email, status });
        }
    };

    return (
        <form onSubmit={ handleSubmit } className="space-y-4">
            <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Name
                </label>
                <Input
                    id="name"
                    value={ name }
                    onChange={ (e) => setName(e.target.value) }
                    placeholder="John Doe"
                    className={ errors.name ? "border-destructive" : "" }
                />
                { errors.name && <p className="text-xs text-destructive">{ errors.name }</p> }
            </div>

            <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Email
                </label>
                <Input
                    id="email"
                    type="email"
                    value={ email }
                    onChange={ (e) => setEmail(e.target.value) }
                    placeholder="john@example.com"
                    className={ errors.email ? "border-destructive" : "" }
                />
                { errors.email && <p className="text-xs text-destructive">{ errors.email }</p> }
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Status
                </label>
                <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="radio"
                            name="status"
                            value="Active"
                            checked={ status === "Active" }
                            onChange={ () => setStatus("Active") }
                            className="accent-primary"
                        />
                        Active
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="radio"
                            name="status"
                            value="Inactive"
                            checked={ status === "Inactive" }
                            onChange={ () => setStatus("Inactive") }
                            className="accent-primary"
                        />
                        Inactive
                    </label>
                </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={ onCancel }>
                    Cancel
                </Button>
                <Button type="submit">
                    { user ? "Update User" : "Add User" }
                </Button>
            </div>
        </form>
    );
}
