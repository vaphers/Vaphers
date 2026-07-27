"use client";

import React, { useEffect, useState } from "react"
import { toast } from "sonner"
import { Loader2, Trash2, Mail, Globe, MessageSquare, CheckSquare, FileText } from "lucide-react"
import AdminLoader from "../Components/AdminLoader"

type Lead = {
  id: string
  fullName?: string
  firstName?: string
  lastName?: string
  email?: string
  website?: string
  service?: string
  message?: string
  contactMethod?: string
  formType?: string
  pageUrl?: string
  blogTitle?: string
  ip?: string
  createdAt: string
  status?: string
}

export default function LeadsDashboard() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedLeads, setSelectedLeads] = useState<string[]>([])
  const [deleting, setDeleting] = useState(false)
  const [expandedLead, setExpandedLead] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("All")

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/leads")
      if (!res.ok) throw new Error("Failed to fetch")
      const data = await res.json()
      setLeads(data.leads || [])
    } catch (err) {
      toast.error("Error fetching leads")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (ids: string[]) => {
    if (!confirm(`Are you sure you want to delete ${ids.length} lead(s)?`)) return
    
    setDeleting(true)
    try {
      const res = await fetch("/api/leads", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      })
      
      const data = await res.json()
      if (res.ok) {
        toast.success(data.message)
        setLeads(leads.filter(l => !ids.includes(l.id)))
        setSelectedLeads([])
      } else {
        throw new Error(data.error)
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to delete")
    } finally {
      setDeleting(false)
    }
  }

  const toggleSelect = (id: string) => {
    setSelectedLeads(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    if (selectedLeads.length === leads.length) {
      setSelectedLeads([])
    } else {
      setSelectedLeads(leads.map(l => l.id))
    }
  }

  const filteredLeads = leads.filter(lead => {
    const searchString = `${lead.fullName || lead.firstName || ""} ${lead.lastName || ""} ${lead.email || ""} ${lead.website || ""}`.toLowerCase();
    const matchesSearch = searchString.includes(searchQuery.toLowerCase());
    
    // Default formType to "Website Contact Form" if missing just for filtering
    const actualFormType = lead.formType || "Website Contact Form";
    const matchesFilter = filterType === "All" || actualFormType === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const uniqueFormTypes = Array.from(new Set(leads.map(l => l.formType || "Website Contact Form")));

  if (loading) {
    return <AdminLoader message="Loading lead inquiries..." />
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 pb-12 montserrat-regular">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Bungee+Shade&family=Montserrat:wght@400;500;600;700;800;900&display=swap');
        .montserrat-regular { font-family: 'Montserrat', sans-serif !important; font-weight: 400 !important; }
        .montserrat-medium { font-family: 'Montserrat', sans-serif !important; font-weight: 500 !important; }
      ` }} />

      {/* ── Sticky Header ── */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 md:px-8 py-3 flex flex-wrap items-center justify-between gap-3 shadow-sm mb-6">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl tracking-tight text-slate-900 leading-none" style={{ fontFamily: '"Bungee Shade", cursive' }}>
            V<span className="text-[#2383e2]">aphers</span>
          </h1>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:inline border-l border-slate-200 pl-4">
            Leads & Inquiries
          </span>
        </div>
      </header>

      <div className="w-full px-4 md:px-8 space-y-6">
        {/* Header Options */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-4 rounded-sm border border-slate-200 shadow-sm">
          
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
             <input
               type="text"
               placeholder="Search name, email, or website..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full sm:w-64 px-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow"
             />
             <select
               value={filterType}
               onChange={(e) => setFilterType(e.target.value)}
               className="w-full sm:w-auto px-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow cursor-pointer bg-white"
             >
               <option value="All">All Sources</option>
               {uniqueFormTypes.map((type) => (
                 <option key={type} value={type}>{type}</option>
               ))}
             </select>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto justify-end shrink-0">
            {selectedLeads.length > 0 && (
              <button
                onClick={() => handleDelete(selectedLeads)}
                disabled={deleting}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
              >
                {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                Delete Selected ({selectedLeads.length})
              </button>
            )}
          </div>
        </div>

        {/* Empty State */}
        {leads.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <InboxIcon className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No leads yet</h3>
            <p className="text-gray-500 mt-1">When someone submits a form, it will appear here.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/80 text-gray-500 text-xs uppercase tracking-wider font-semibold border-b border-gray-100">
                    <th className="p-4 w-12">
                      <input 
                        type="checkbox" 
                        checked={selectedLeads.length === leads.length && leads.length > 0}
                        onChange={toggleSelectAll}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                      />
                    </th>
                    <th className="p-4">Lead Info</th>
                    <th className="p-4">Source</th>
                    <th className="p-4">Date</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredLeads.map((lead) => (
                    <React.Fragment key={lead.id}>
                      <tr className="hover:bg-gray-50/50 transition-colors group">
                        <td className="p-4">
                          <input 
                            type="checkbox" 
                            checked={selectedLeads.includes(lead.id)}
                            onChange={() => toggleSelect(lead.id)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                          />
                        </td>
                        
                        {/* Info */}
                        <td className="p-4">
                          <div className="flex flex-col gap-1">
                            <span className="font-semibold text-gray-900 flex items-center gap-2">
                              {lead.fullName || [lead.firstName, lead.lastName].filter(Boolean).join(" ") || "Unknown Lead"}
                              {lead.formType === "Blog Sidebar Lead" && (
                                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] uppercase font-bold tracking-wider">
                                  Blog
                                </span>
                              )}
                              {lead.formType !== "Blog Sidebar Lead" && (
                                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] uppercase font-bold tracking-wider">
                                  {lead.formType || "Form"}
                                </span>
                              )}
                            </span>
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                              {lead.email && (
                                <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {lead.email}</span>
                              )}
                              {lead.website && (
                                <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> {lead.website.replace("https://", "").replace("http://", "")}</span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Source */}
                        <td className="p-4">
                          <div className="flex flex-col gap-1 text-sm text-gray-600">
                            {lead.service && (
                              <span className="font-medium text-gray-900">{lead.service}</span>
                            )}
                            {lead.blogTitle && (
                              <span className="truncate max-w-[200px]" title={lead.blogTitle}>{lead.blogTitle}</span>
                            )}
                          </div>
                        </td>

                        {/* Date */}
                        <td className="p-4 text-sm text-gray-500 whitespace-nowrap">
                          {new Date(lead.createdAt).toLocaleDateString("en-US", { 
                            month: 'short', day: 'numeric', year: 'numeric' 
                          })}
                        </td>

                        {/* Actions */}
                        <td className="p-4 text-right">
                          <button
                            onClick={() => setExpandedLead(expandedLead === lead.id ? null : lead.id)}
                            className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            {expandedLead === lead.id ? "Close" : "View"}
                          </button>
                        </td>
                      </tr>

                      {/* Expanded View */}
                      {expandedLead === lead.id && (
                        <tr className="bg-gray-50/50">
                          <td colSpan={5} className="p-0 border-t-0">
                            <div className="p-6 border-b border-gray-100">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                
                                <div className="space-y-4">
                                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Submission Details</h4>
                                  
                                  {lead.contactMethod && (
                                    <div className="flex items-start gap-3">
                                      <CheckSquare className="w-5 h-5 text-gray-400 mt-0.5" />
                                      <div>
                                        <p className="text-xs text-gray-500">Contact Method</p>
                                        <p className="text-sm font-medium text-gray-900">{lead.contactMethod}</p>
                                      </div>
                                    </div>
                                  )}
                                  
                                  {lead.pageUrl && (
                                    <div className="flex items-start gap-3">
                                      <Globe className="w-5 h-5 text-gray-400 mt-0.5" />
                                      <div>
                                        <p className="text-xs text-gray-500">Submitted From URL</p>
                                        <a href={lead.pageUrl} target="_blank" className="text-sm font-medium text-blue-600 hover:underline break-all">
                                          {lead.pageUrl}
                                        </a>
                                      </div>
                                    </div>
                                  )}

                                  {lead.ip && (
                                    <div className="flex items-start gap-3">
                                      <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                                      <div>
                                        <p className="text-xs text-gray-500">IP Address</p>
                                        <p className="text-sm font-medium text-gray-900">{lead.ip}</p>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                <div className="space-y-4">
                                  {lead.message && (
                                    <>
                                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Message</h4>
                                      <div className="flex items-start gap-3">
                                        <MessageSquare className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                                        <p className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg w-full border border-gray-100">
                                          {lead.message}
                                        </p>
                                      </div>
                                    </>
                                  )}
                                </div>
                                
                                <div className="col-span-full pt-4 mt-2 border-t border-gray-100 flex justify-end gap-3">
                                  <button onClick={() => handleDelete([lead.id])} className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                    Delete Lead
                                  </button>
                                  {lead.email && (
                                    <a href={`mailto:${lead.email}`} className="px-4 py-2 text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 rounded-lg transition-colors shadow-sm">
                                      Reply Direct
                                    </a>
                                  )}
                                </div>
                                
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function InboxIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
    </svg>
  )
}
