import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/Button";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity animate-in fade-in duration-200">
            <div className="relative w-full max-w-lg rounded-lg bg-background p-6 shadow-lg animate-in zoom-in-95 duration-200 border border-border">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">{ title }</h2>
                    <Button variant="ghost" size="icon" onClick={ onClose }>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
                <div>{ children }</div>
            </div>
        </div>
    );
}
