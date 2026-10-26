'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, FileText, Link2, Paperclip, ShieldCheck, Sparkles } from 'lucide-react';
import { getPortfolioStatusLabel, portfolioEntries, validatePortfolioUpload } from '@/lib/portfolio';

export default function PortfolioPage() {
  const [entries, setEntries] = useState(portfolioEntries);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');

  const summary = useMemo(() => {
    const approved = entries.filter((entry) => entry.status === 'approved').length;
    const review = entries.filter((entry) => entry.status === 'under_review').length;
    return { approved, review, total: entries.length };
  }, [entries]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setUploadMessage('Sarlavha kiritilishi shart.');
      return;
    }

    if (!description.trim()) {
      setUploadMessage('Tavsif kiritilishi shart.');
      return;
    }

    if (fileName) {
      const validation = validatePortfolioUpload({
        name: fileName,
        size: 1024 * 1024,
        type: 'application/pdf',
      });

      if (!validation.valid) {
        setUploadMessage(validation.errors.join(' '));
        return;
      }
    }

    const newEntry = {
      id: `entry-${Date.now()}`,
      title,
      description,
      url: url || undefined,
      fileName: fileName || undefined,
      submittedAt: new Date().toISOString().slice(0, 10),
      status: 'under_review',
      feedback: 'Yuborilgan portfolio element tekshirilmoqda.',
    };

    setEntries((current) => [newEntry, ...current]);
    setTitle('');
    setDescription('');
    setUrl('');
    setFileName('');
    setUploadMessage('Portfolio elementi muvaffaqiyatli yuborildi. O’qituvchi tomonidan tekshiruvga yuborildi.');
  };

  return (
    <main className="page-shell py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-brand-700">Smart Portfolio</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">Portfolio va fayllar</h1>
        </div>
        <div className="status-badge border-emerald-200 bg-emerald-50 text-emerald-700">
          <ShieldCheck className="mr-2 h-4 w-4" />
          Private storage
        </div>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="card p-5">
          <div className="text-sm text-slate-500">Jami yozuvlar</div>
          <div className="mt-2 text-3xl font-black text-slate-900">{summary.total}</div>
        </div>
        <div className="card p-5">
          <div className="text-sm text-slate-500">Tasdiqlangan</div>
          <div className="mt-2 text-3xl font-black text-slate-900">{summary.approved}</div>
        </div>
        <div className="card p-5">
          <div className="text-sm text-slate-500">Tekshirilmoqda</div>
          <div className="mt-2 text-3xl font-black text-slate-900">{summary.review}</div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="card p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-brand-50 p-3 text-brand-700">
              <Sparkles className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Portfolio qo’shish</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-slate-700">Sarlavha</label>
              <input className="input-field" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Maqola, loyiha yoki poster" />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Tavsif</label>
              <textarea className="input-field min-h-[110px]" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Yozuv va natija haqida qisqacha ma’lumot..." />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Tashqi havola</label>
              <div className="relative">
                <Link2 className="pointer-events-none absolute left-3 top-4 h-4 w-4 text-slate-400" />
                <input className="input-field pl-10" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Fayl yuklash</label>
              <div className="relative">
                <Paperclip className="pointer-events-none absolute left-3 top-4 h-4 w-4 text-slate-400" />
                <input type="text" className="input-field pl-10" value={fileName} onChange={(e) => setFileName(e.target.value)} placeholder="report.pdf" />
              </div>
              <div className="mt-2 text-xs text-slate-500">Fayl xususiyatlari: PDF, DOCX, PNG, JPG, WEBP yoki TXT; max 5MB; xususiy storage</div>
            </div>

            {uploadMessage ? (
              <div className="rounded-xl border border-brand-200 bg-brand-50 px-3 py-2 text-sm text-brand-700">
                {uploadMessage}
              </div>
            ) : null}

            <button type="submit" className="button-primary w-full">
              Portfolio yuborish
            </button>
          </form>
        </div>

        <div className="space-y-5">
          {entries.map((entry) => (
            <div key={entry.id} className="card p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="text-xl font-black text-slate-900">{entry.title}</div>
                  <div className="mt-2 text-sm leading-6 text-slate-600">{entry.description}</div>
                </div>
                <span className="status-badge border-brand-200 bg-brand-50 text-brand-700">
                  {getPortfolioStatusLabel(entry.status)}
                </span>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Manba</div>
                  <div className="mt-2 flex items-center gap-2">
                    {entry.url ? (
                      <>
                        <Link2 className="h-4 w-4 text-brand-600" />
                        <a href={entry.url} target="_blank" rel="noreferrer" className="text-brand-700 underline">
                          Havola
                        </a>
                      </>
                    ) : (
                      <>
                        <FileText className="h-4 w-4 text-brand-600" />
                        {entry.fileName ?? 'Fayl mavjud emas'}
                      </>
                    )}
                  </div>
                </div>

                <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Yuborilgan sana</div>
                  <div className="mt-2 font-semibold text-slate-700">{entry.submittedAt}</div>
                </div>
              </div>

              {entry.feedback ? (
                <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                  <div className="flex items-center gap-2 font-semibold">
                    <CheckCircle2 className="h-4 w-4" />
                    O’qituvchi fikri
                  </div>
                  <div className="mt-2">{entry.feedback}</div>
                  {entry.grade ? <div className="mt-2 font-semibold">Bahosi: {entry.grade}/100</div> : null}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
