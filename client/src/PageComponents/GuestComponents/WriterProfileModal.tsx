'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { User, AlertCircle, Loader2, Globe, FileText, CheckCircle2, ShieldAlert } from 'lucide-react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  uid: string;
  initialName?: string;
  initialBio?: string;
  initialWebsite?: string;
  onProfileUpdated?: (updated: { name: string; bio: string; website: string }) => void;
};

export default function WriterProfileModal({
  isOpen,
  onClose,
  uid,
  initialName = '',
  initialBio = '',
  initialWebsite = '',
  onProfileUpdated,
}: Props) {
  const [name, setName] = useState(initialName);
  const [bio, setBio] = useState(initialBio);
  const [website, setWebsite] = useState(initialWebsite);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setName(initialName);
    setBio(initialBio);
    setWebsite(initialWebsite);
    setError(null);
    setSavedSuccess(false);
  }, [initialName, initialBio, initialWebsite, isOpen]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Author Name is required.');
      return;
    }

    // Validation: simple heuristic to warn if author name looks like an agency/company
    const companyKeywords = ['agency', 'company', 'inc', 'llc', 'solutions', 'technologies', 'media', 'studio', 'group', 'ltd'];
    const hasCompanyKeyword = companyKeywords.some((w) => name.toLowerCase().split(' ').includes(w));
    if (hasCompanyKeyword) {
      setError('Author name must be a real person\'s name (e.g., "Sarah Jenkins"), not an agency or company name.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/guest/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid,
          name: name.trim(),
          bio: bio.trim(),
          website: website.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to update profile');
      }

      setSavedSuccess(true);
      if (onProfileUpdated) {
        onProfileUpdated({
          name: name.trim(),
          bio: bio.trim(),
          website: website.trim(),
        });
      }

      setTimeout(() => {
        setSavedSuccess(false);
        onClose();
      }, 1000);
    } catch (err: any) {
      setError(err.message || 'Error saving profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-white border border-slate-200 text-slate-900 rounded-2xl shadow-2xl p-6 sm:p-8">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <User className="w-5 h-5 text-[#2383e2]" />
            <span>Author Profile Settings</span>
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500">
            This name and bio are displayed on all your live published blog articles.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2">
            <AlertCircle size={15} className="shrink-0 mt-0.5 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        {savedSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 flex items-center gap-2">
            <CheckCircle2 size={15} className="text-emerald-600" />
            <span>Profile updated successfully!</span>
          </div>
        )}

        {/* IMPORTANT MANDATORY DISCLAIMER */}
        <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-900 leading-relaxed">
          <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
          <div>
            <strong className="font-semibold block text-amber-950 mb-0.5">
              Personal Name Policy &amp; Disclaimer:
            </strong>
            You can only add the <u>real personal name of an individual</u> (e.g., <em>"Sarah Jenkins"</em>). Company, brand, or agency names are strictly prohibited and will be rejected during editorial review.
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4 pt-1">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Author Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sarah Jenkins"
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Author Bio (About You)
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="e.g. Senior B2B SEO Strategist with 7+ years of experience helping SaaS founders scale organic traffic and demand generation."
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
            />
            <span className="text-[11px] text-slate-400 block mt-1">
              Displayed in the Author Box at the end of every published post.
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Author Website / Portfolio Link
            </label>
            <div className="relative">
              <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://yourportfolio.com"
                className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
              />
            </div>
            <span className="text-[11px] text-slate-400 block mt-1">
              Your permanent DoFollow backlink on approved articles.
            </span>
          </div>

          <DialogFooter className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-[#2383e2] hover:bg-[#1a6cb8] text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-60"
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : <User size={14} />}
              <span>Save Author Profile</span>
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
