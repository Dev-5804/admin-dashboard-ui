"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { useUserStore, User } from "@/lib/store";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { Modal } from "@/components/Modal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/Table";
import { UserForm } from "@/components/UserForm";

export default function DashboardPage() {
    const { users, isLoading, error, fetchUsers, addUser, updateUser, deleteUser } = useUserStore();
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
    );

    const handleAdd = () => {
        setEditingUser(null);
        setIsModalOpen(true);
    };

    const handleEdit = (user: User) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (id: string) => {
        setDeleteId(id);
    };

    const confirmDelete = async () => {
        if (deleteId) {
            await deleteUser(deleteId);
            setDeleteId(null);
        }
    };

    const handleFormSubmit = async (data: Omit<User, "id">) => {
        if (editingUser) {
            await updateUser(editingUser.id, data);
        } else {
            await addUser(data);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Users</h1>
                    <p className="text-muted-foreground">Manage your user base here.</p>
                </div>
                <Button onClick={ handleAdd }>
                    <Plus className="mr-2 h-4 w-4" /> Add User
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>All Users</CardTitle>
                        <div className="relative w-full max-w-xs">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search users..."
                                value={ search }
                                onChange={ (e) => setSearch(e.target.value) }
                                className="pl-8"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    { isLoading ? (
                        <div className="text-center py-4">Loading...</div>
                    ) : error ? (
                        <div className="text-center py-4 text-destructive">{ error }</div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                { filteredUsers.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={ 4 } className="text-center py-8 text-muted-foreground">
                                            No users found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredUsers.map((user) => (
                                        <TableRow key={ user.id }>
                                            <TableCell className="font-medium">{ user.name }</TableCell>
                                            <TableCell>{ user.email }</TableCell>
                                            <TableCell>
                                                <Badge variant={ user.status === "Active" ? "success" : "secondary" }>
                                                    { user.status }
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="icon" onClick={ () => handleEdit(user) }>
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={ () => handleDeleteClick(user.id) } className="text-destructive hover:text-destructive">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) }
                            </TableBody>
                        </Table>
                    ) }
                </CardContent>
            </Card>

            {/* Add/Edit User Modal */ }
            <Modal
                isOpen={ isModalOpen }
                onClose={ () => setIsModalOpen(false) }
                title={ editingUser ? "Edit User" : "Add New User" }
            >
                <UserForm
                    user={ editingUser }
                    onSubmit={ handleFormSubmit }
                    onCancel={ () => setIsModalOpen(false) }
                />
            </Modal>

            {/* Delete Confirmation Modal */ }
            <Modal
                isOpen={ !!deleteId }
                onClose={ () => setDeleteId(null) }
                title="Confirm Deletion"
            >
                <div className="space-y-4">
                    <p>Are you sure you want to delete this user? This action cannot be undone.</p>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={ () => setDeleteId(null) }>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={ confirmDelete }>
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
