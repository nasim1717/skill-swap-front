// hooks/useSocket.ts
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthContext } from './useAuthContext';
// Adjust import based on your auth setup

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export const useSocket = () => {
    const socketRef = useRef<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const { user } = useAuthContext(); // Get current user


    useEffect(() => {
        if (!user?.id) return;

        // Initialize socket connection
        socketRef.current = io(SOCKET_URL, {
            transports: ['websocket'],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });

        const socket = socketRef.current;

        socket.on('connect', () => {
            console.log('🟢 Socket connected');
            setIsConnected(true);
            // Authenticate with user ID
            socket.emit('authenticate', { userId: user.id });
        });

        socket.on('disconnect', () => {
            console.log('🔴 Socket disconnected');
            setIsConnected(false);
        });

        socket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
            setIsConnected(false);
        });

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [user?.id]);

    return { socket: socketRef.current, isConnected };
};