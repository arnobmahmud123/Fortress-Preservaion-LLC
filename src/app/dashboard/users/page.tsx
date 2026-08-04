"use client";

import { useState } from "react";
import { Users, UserPlus, Shield, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function UsersPage() {
  const [showAddUser, setShowAddUser] = useState(false);
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "Admin User",
      email: "admin@fortresspreservation.com",
      role: "ADMIN",
      status: "ACTIVE",
    },
    {
      id: "2",
      name: "Field Operations Manager",
      email: "ops@fortresspreservation.com",
      role: "EDITOR",
      status: "ACTIVE",
    },
    {
      id: "3",
      name: "Compliance Specialist",
      email: "compliance@fortresspreservation.com",
      role: "WRITER",
      status: "ACTIVE",
    },
  ]);

  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("WRITER");

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail || !newName) return;
    setUsers([
      ...users,
      {
        id: Date.now().toString(),
        name: newName,
        email: newEmail,
        role: newRole,
        status: "INVITED",
      },
    ]);
    setNewName("");
    setNewEmail("");
    setShowAddUser(false);
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-10 text-slate-100 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            <Users className="w-8 h-8 text-amber-400" /> Admin Users & Access Control
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage administrative accounts, role permissions (Admin, Editor, Writer, Viewer), and team access.
          </p>
        </div>
        <Button
          onClick={() => setShowAddUser(true)}
          className="bg-amber-400 text-slate-950 font-bold text-xs uppercase px-4 self-start flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" /> Invite Team Member
        </Button>
      </div>

      {showAddUser && (
        <Card className="bg-[#0B1D3A] border border-amber-500/30">
          <CardHeader>
            <CardTitle className="text-white text-base">Invite New Admin User</CardTitle>
            <CardDescription className="text-slate-400">Send an invitation email to join the Fortress CMS team</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Full Name</label>
                  <Input
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Jane Doe"
                    className="bg-[#071120] border-slate-700 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Email Address</label>
                  <Input
                    type="email"
                    required
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="jane@fortresspreservation.com"
                    className="bg-[#071120] border-slate-700 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Role Permission</label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full px-3 py-2 bg-[#071120] border border-slate-700 rounded-lg text-xs text-white"
                  >
                    <option value="ADMIN">ADMIN (Full Control)</option>
                    <option value="EDITOR">EDITOR (Publishing & Media)</option>
                    <option value="WRITER">WRITER (Create Drafts)</option>
                    <option value="VIEWER">VIEWER (Read Only)</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setShowAddUser(false)} className="text-xs">
                  Cancel
                </Button>
                <Button type="submit" className="bg-amber-400 text-slate-950 font-bold text-xs uppercase">
                  Send Invitation
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* USERS LIST TABLE */}
      <div className="bg-[#0B1D3A]/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#071120] text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-[#0F2448]/40 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-white flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-amber-400/20 text-amber-400 font-bold text-xs flex items-center justify-center">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <div>{u.name}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                          <Mail className="w-3 h-3 text-slate-500" /> {u.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-mono font-bold text-amber-400 flex items-center gap-1.5 pt-6">
                    <Shield className="w-3.5 h-3.5 text-amber-400" /> {u.role}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        u.status === "ACTIVE"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
