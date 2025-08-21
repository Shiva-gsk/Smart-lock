"use client"
import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Clock, User, Calendar, Shield, AlertCircle, CheckCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from '@/components/ui/checkbox';

const Dashboard = () => {
  const [isLocked, setIsLocked] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  // Mock entry logs data
  const [entryLogs, setEntryLogs] = useState([
    {
      id: 1,
      rfid: 'RFID-001-ABC',
      name: 'John Doe',
      action: 'unlock',
      timestamp: new Date('2025-01-18T09:30:00'),
      status: 'success'
    },
    {
      id: 2,
      rfid: 'RFID-002-DEF',
      name: 'Jane Smith',
      action: 'unlock',
      timestamp: new Date('2025-01-18T08:45:00'),
      status: 'success'
    },
    {
      id: 3,
      rfid: 'RFID-003-GHI',
      name: 'Mike Johnson',
      action: 'unlock',
      timestamp: new Date('2025-01-18T07:15:00'),
      status: 'success'
    },
    {
      id: 4,
      rfid: 'RFID-UNKNOWN',
      name: 'Unknown User',
      action: 'unlock',
      timestamp: new Date('2025-01-17T22:30:00'),
      status: 'denied'
    },
    {
      id: 5,
      rfid: 'RFID-001-ABC',
      name: 'John Doe',
      action: 'unlock',
      timestamp: new Date('2025-01-17T18:00:00'),
      status: 'success'
    }
  ]);

  // Update time and greeting
  useEffect(() => {
    // Note: localStorage is not available in Claude artifacts, so this check is commented out
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }
    setIsLoaded(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) {
        setGreeting('Good Morning');
      } else if (hour < 18) {
        setGreeting('Good Afternoon');
      } else {
        setGreeting('Good Evening');
      }
    };

    updateGreeting();
    return () => clearInterval(timer);
  }, []);

  const handleLockToggle = () => {
    const newStatus = !isLocked;
    setIsLocked(newStatus);

    // Add new entry to logs
    const newEntry = {
      id: entryLogs.length + 1,
      rfid: 'MANUAL-CONTROL',
      name: 'Admin',
      action: newStatus ? 'lock' : 'unlock',
      timestamp: new Date(),
      status: 'success'
    };

    setEntryLogs(prev => [newEntry, ...prev]);

    setTimeout(() => {
      setIsLocked(!newStatus);
    }, 5000)
  };

  const handleSignOut = () => {
    // In a real app, you would clear the token and redirect
    localStorage.removeItem('token');
    window.location.href = '/login';

    // For demo purposes, show an alert
    // alert('Sign out functionality - would redirect to login page');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (date: Date) => {
    return `${formatDate(date)} at ${formatTime(date)}`;
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <div className="flex flex-col items-center gap-6">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-amber-400 border-opacity-60"></div>
          <h2 className="text-2xl font-bold text-amber-100">Loading Dashboard...</h2>
          <p className="text-slate-400">Please wait while we prepare your smart lock dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="md:text-4xl text-xl font-bold text-amber-50 mb-2">
                Smart Lock Dashboard
              </h1>
              <p className="md:text-xl text-xs text-amber-100">
                {greeting}! Welcome back.
              </p>
            </div>

            {/* Time and Sign Out Section */}
            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-4">
              <div className="text-right text-amber-100">
                <div className="flex items-center justify-end gap-2 mb-1">
                  <Clock className="w-4 sm:w-5 h-4 sm:h-5" />
                  <span className="text-xs sm:text-sm md:text-lg font-mono">{formatTime(currentTime)}</span>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <Calendar className="w-3 sm:w-4 h-3 sm:h-4" />
                  <span className="text-xs md:text-sm">{formatDate(currentTime)}</span>
                </div>
              </div>

              {/* Sign Out Button */}
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 text-red-400 hover:text-red-300 px-4 py-2 rounded-lg transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline text-sm font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Status and Controls Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">

          {/* Current Lock Status */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-amber-400" />
                <h2 className="md:text-xl font-semibold text-amber-50">Current Status</h2>
              </div>

              <div className="text-center py-8">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${isLocked
                  ? 'bg-red-500/20 text-red-400'
                  : 'bg-green-500/20 text-green-400'
                  }`}>
                  {isLocked ? <Lock className="w-10 h-10" /> : <Unlock className="w-10 h-10" />}
                </div>

                <h3 className="md:text-2xl text-lg font-bold text-amber-50 mb-2">
                  {isLocked ? 'LOCKED' : 'UNLOCKED'}
                </h3>
                <p className="text-slate-400 ">
                  Door is currently {isLocked ? 'secured' : 'accessible'}
                </p>
              </div>
            </div>
          </div>

          {/* Control Panel */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <h2 className="md:text-xl font-semibold text-amber-50 mb-6 flex items-center gap-3">
                <User className="w-6 h-6 text-amber-400" />
                Control Panel
              </h2>

              <div className="grid gap-4">
                <button
                  onClick={handleLockToggle}
                  disabled={!isLocked}
                  className={`p-6 rounded-lg border-2 transition-all duration-300 ${!isLocked
                    ? 'bg-gray-600/20 border-gray-600/50 text-gray-400 cursor-not-allowed'
                    : 'bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20 hover:border-green-500/50'
                    }`}
                >
                  <Unlock className="w-8 h-8 mx-auto mb-3" />
                  <div className="text-center">
                    <h3 className="font-semibold text-lg mb-1">Unlock Door</h3>
                    <p className="text-sm opacity-80">
                      {!isLocked ? 'Already unlocked' : 'Grant access'}
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Entry Logs */}
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl font-semibold text-amber-50">Recent Entry Logs</h2>
            </div>
            <span className="bg-amber-500/20 text-amber-400 px-2 py-1 rounded-full text-sm font-medium sm:ml-auto">
              {entryLogs.length} entries
            </span>
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <table className="w-full hidden md:table">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="text-left text-amber-100 font-semibold py-3 px-4">RFID</th>
                  <th className="text-left text-amber-100 font-semibold py-3 px-4">User</th>
                  <th className="text-left text-amber-100 font-semibold py-3 px-4">Action</th>
                  <th className="text-left text-amber-100 font-semibold py-3 px-4">Timestamp</th>
                  <th className="text-left text-amber-100 font-semibold py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {entryLogs.map((log) => (
                  <tr key={log.id} className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors">
                    <td className="py-4 px-4">
                      <code className="bg-slate-700/50 text-amber-300 px-2 py-1 rounded text-sm">
                        {log.rfid}
                      </code>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-slate-400" />
                        <span className="text-amber-50 font-medium">{log.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        {log.action === 'unlock' ? (
                          <Unlock className="w-4 h-4 text-green-400" />
                        ) : (
                          <Lock className="w-4 h-4 text-red-400" />
                        )}
                        <span className={`capitalize font-medium ${log.action === 'unlock' ? 'text-green-400' : 'text-red-400'
                          }`}>
                          {log.action}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-slate-300 text-sm">
                        {formatDateTime(log.timestamp)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        {log.status === 'success' ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-green-500 font-medium">Success</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-4 h-4 text-red-500" />
                            <span className="text-red-500 font-medium">Denied</span>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile Card List */}
            <div className="flex flex-col gap-4 md:hidden">
              {entryLogs.map((log) => (
                <div
                  key={log.id}
                  className="bg-slate-700/60 rounded-lg p-4 border border-slate-700/30 flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {log.action === 'unlock' ? (
                        <Unlock className="w-5 h-5 text-green-400" />
                      ) : (
                        <Lock className="w-5 h-5 text-red-400" />
                      )}
                      <span className={`capitalize font-medium ${log.action === 'unlock' ? 'text-green-400' : 'text-red-400'
                        }`}>
                        {log.action}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {log.status === 'success' ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-green-500 font-medium text-xs">Success</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4 text-red-500" />
                          <span className="text-red-500 font-medium text-xs">Denied</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-400" />
                    <span className="text-amber-50 font-medium text-sm">{log.name}</span>
                  </div>
                  <div>
                    <code className="bg-slate-800/60 text-amber-300 px-2 py-1 rounded text-xs">
                      {log.rfid}
                    </code>
                  </div>
                  <div className="text-slate-300 text-xs">
                    {formatDateTime(log.timestamp)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='flex items-center justify-center pt-6 '>
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full max-w-xs">
          Manage RFID Cards
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-2xl shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Select Cards to Invalidate
          </DialogTitle>
          <DialogDescription className="text-slate-500">
            Choose the RFID cards you want to revoke access for.
          </DialogDescription>
        </DialogHeader>

        {/* Checkbox list */}
        <div className="flex flex-col gap-4 mt-2">
          <Label className="font-medium text-slate-700">
            Select RFID Cards
          </Label>

          <div className="flex flex-col gap-2 max-h-48 overflow-y-auto rounded-lg border p-3 shadow-inner scrollbar-thin scrollbar-thumb-slate-300 hover:scrollbar-thumb-slate-400">
            {Array.from(
              entryLogs
                .filter(log => log.name !== "Unknown User")
                .reduce((acc, log) => {
                  if (!acc.has(log.rfid)) acc.set(log.rfid, []);
                  acc.get(log.rfid)!.push(log.name);
                  return acc;
                }, new Map<string, string[]>()),
            ).map(([rfid, names]) => (
              <label
                key={rfid}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-100 transition cursor-pointer"
              >
                <Checkbox value={rfid} />
                <span className="text-sm text-slate-700">
                  {Array.from(new Set(names)).join(", ")} <span className="text-slate-400">({rfid})</span>
                </span>
              </label>
            ))}
          </div>

          <span className="text-xs text-slate-400">
            Tick the cards you want to invalidate.
          </span>
        </div>

        <DialogFooter className="sm:justify-start mt-4">
          <DialogClose asChild>
            <Button type="button" variant="destructive" className="w-full sm:w-auto">
              Invalidate Selected
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;