"use client";

import { useEffect, useState, useMemo } from "react";
import { Plus, Pencil, Trash2, Search, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useUserStore, User } from "@/lib/store";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { Modal } from "@/components/Modal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/Table";
import { UserForm } from "@/components/UserForm";

type SortField = "name" | "email" | "status";
type SortOrder = "asc" | "desc";

export default function UsersPage() {
    const { users, isLoading, error, fetchUsers, addUser, updateUser, deleteUser } = useUserStore();
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    // Sorting state
    const [sortField, setSortField] = useState<SortField>("name");
    const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // Filter users based on search
    const filteredUsers = useMemo(() => {
        return users.filter(
            (user) =>
                user.name.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase())
        );
    }, [users, search]);

    // Sort filtered users
    const sortedUsers = useMemo(() => {
        const sorted = [...filteredUsers].sort((a, b) => {
            let aValue = a[sortField];
            let bValue = b[sortField];

            if (typeof aValue === "string") aValue = aValue.toLowerCase();
            if (typeof bValue === "string") bValue = bValue.toLowerCase();

            if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
            if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });
        return sorted;
    }, [filteredUsers, sortField, sortOrder]);

    // Reset currentPage when filteredUsers changes
    const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
    const validCurrentPage = currentPage > totalPages && totalPages > 0 ? totalPages : currentPage;

    // Paginate sorted users
    const paginatedUsers = useMemo(() => {
        const startIndex = (validCurrentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return sortedUsers.slice(startIndex, endIndex);
    }, [sortedUsers, validCurrentPage, itemsPerPage]);

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
        setCurrentPage(1); // Reset to page 1 when sorting
    };

    const handleSearchChange = (value: string) => {
        setSearch(value);
        setCurrentPage(1); // Reset to page 1 when searching
    };

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

    const goToPage = (page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Users</h1>
                    <p className="text-muted-foreground">Manage your user base here.</p>
                </div>
                <Button onClick={ handleAdd } className="w-full sm:w-auto">
                    <Plus className="mr-2 h-4 w-4" /> Add User
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <CardTitle>All Users</CardTitle>
                        <div className="relative w-full max-w-xs">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search users..."
                                value={ search }
                                onChange={ (e) => handleSearchChange(e.target.value) }
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
                        <>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>
                                            <button
                                                onClick={ () => handleSort("name") }
                                                className="flex items-center gap-1 hover:text-foreground transition-colors"
                                            >
                                                Name
                                                <ArrowUpDown className="h-3 w-3" />
                                            </button>
                                        </TableHead>
                                        <TableHead className="hidden sm:table-cell">
                                            <button
                                                onClick={ () => handleSort("email") }
                                                className="flex items-center gap-1 hover:text-foreground transition-colors"
                                            >
                                                Email
                                                <ArrowUpDown className="h-3 w-3" />
                                            </button>
                                        </TableHead>
                                        <TableHead className="hidden sm:table-cell">
                                            <button
                                                onClick={ () => handleSort("status") }
                                                className="flex items-center gap-1 hover:text-foreground transition-colors"
                                            >
                                                Status
                                                <ArrowUpDown className="h-3 w-3" />
                                            </button>
                                        </TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    { paginatedUsers.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={ 4 } className="text-center py-8 text-muted-foreground">
                                                No users found.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        paginatedUsers.map((user) => (
                                            <TableRow key={ user.id }>
                                                <TableCell className="font-medium">{ user.name }</TableCell>
                                                <TableCell className="hidden sm:table-cell">{ user.email }</TableCell>
                                                <TableCell className="hidden sm:table-cell">
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

                            {/* Pagination Controls */ }
                            { sortedUsers.length > 0 && (
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-4">
                                    <div className="text-sm text-muted-foreground">
                                        Showing { ((validCurrentPage - 1) * itemsPerPage) + 1 } to { Math.min(validCurrentPage * itemsPerPage, sortedUsers.length) } of { sortedUsers.length } users
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={ () => goToPage(validCurrentPage - 1) }
                                            disabled={ validCurrentPage === 1 }
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                            Previous
                                        </Button>
                                        <div className="text-sm">
                                            Page { validCurrentPage } of { totalPages }
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={ () => goToPage(validCurrentPage + 1) }
                                            disabled={ validCurrentPage === totalPages }
                                        >
                                            Next
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ) }
                        </>
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
                    key={ editingUser?.id || 'new' }
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
