// src/components/Login.jsx
import React, { useState } from 'react';
import { signIn, signUp, resetPassword } from '../firebase/auth';

export default function Login({ onSuccess }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    if (mode === 'login') {
      const result = await signIn(email, password);
      if (result.success) {
        onSuccess?.(result.user);
      } else {
        setError(result.error);
      }
    } else if (mode === 'signup') {
      if (!name.trim()) {
        setError('Bitte Namen eingeben');
        setLoading(false);
        return;
      }
      const result = await signUp(email, password, name);
      if (result.success) {
        onSuccess?.(result.user);
      } else {
        setError(result.error);
      }
    } else if (mode === 'reset') {
      const result = await resetPassword(email);
      if (result.success) {
        setMessage('E-Mail zum Zurücksetzen wurde gesendet!');
        setMode('login');
      } else {
        setError(result.error);
      }
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">💪</div>
          <h1 className="text-3xl font-bold text-white">GlucoFit</h1>
          <p className="text-slate-400 mt-2">Diabetes + Hypertrophie</p>
        </div>

        {/* Form */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h2 className="text-xl font-semibold text-white mb-6">
            {mode === 'login' && 'Anmelden'}
            {mode === 'signup' && 'Registrieren'}
            {mode === 'reset' && 'Passwort zurücksetzen'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-sm text-slate-400 mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                  placeholder="Dein Name"
                />
              </div>
            )}

            <div>
              <label className="block text-sm text-slate-400 mb-1">E-Mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                placeholder="deine@email.de"
                required
              />
            </div>

            {mode !== 'reset' && (
              <div>
                <label className="block text-sm text-slate-400 mb-1">Passwort</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                  placeholder="••••••••"
                  required={mode !== 'reset'}
                  minLength={6}
                />
              </div>
            )}

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-3 text-red-400 text-sm">
                ⚠️ {error}
              </div>
            )}

            {message && (
              <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-xl p-3 text-emerald-400 text-sm">
                ✓ {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
            >
              {loading ? '...' : (
                <>
                  {mode === 'login' && '🚀 Anmelden'}
                  {mode === 'signup' && '✨ Registrieren'}
                  {mode === 'reset' && '📧 Link senden'}
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            {mode === 'login' && (
              <>
                <button onClick={() => setMode('reset')} className="text-slate-400 hover:text-white">
                  Passwort vergessen?
                </button>
                <div className="mt-4 text-slate-400">
                  Neu hier?{' '}
                  <button onClick={() => setMode('signup')} className="text-emerald-400 hover:text-emerald-300 font-medium">
                    Registrieren
                  </button>
                </div>
              </>
            )}
            {mode === 'signup' && (
              <div className="text-slate-400">
                Bereits registriert?{' '}
                <button onClick={() => setMode('login')} className="text-emerald-400 hover:text-emerald-300 font-medium">
                  Anmelden
                </button>
              </div>
            )}
            {mode === 'reset' && (
              <button onClick={() => setMode('login')} className="text-emerald-400 hover:text-emerald-300 font-medium">
                ← Zurück zur Anmeldung
              </button>
            )}
          </div>
        </div>

        {/* T1D Notice */}
        <div className="mt-8 bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🩸</span>
            <div>
              <p className="text-slate-300 text-sm font-medium">Für Typ-1-Diabetiker</p>
              <p className="text-slate-500 text-xs mt-1">
                Optimiert für sicheres Training mit BZ-Tracking und Hypo-Warnungen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}