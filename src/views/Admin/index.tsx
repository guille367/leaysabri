import { useState, useEffect } from 'react'
import './styles.scss'

const ADMIN_PASSWORD = 'LEASABRIW'

interface Guest {
    id: string
    name: string
    guests: string[]
    guestsAmount: number
    dietaryRestrictions: string
    code: string
    confirmado: boolean
    createdAt: string
    updatedAt: string
}

function generateCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let code = ''
    for (let i = 0; i < 8; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return code
}

export default function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState(false)

    const [guests, setGuests] = useState<Guest[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [newGuest, setNewGuest] = useState({
        name: '',
        guestsAmount: 1,
        code: '',
    })

    // Check for existing session on mount
    useEffect(() => {
        setNewGuest(prev => ({ ...prev, code: generateCode() }))
        const session = localStorage.getItem('admin_session')
        if (session === 'authenticated') {
            setIsAuthenticated(true)
        }
    }, [])
    const [saving, setSaving] = useState(false)

    const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true)
            setLoginError(false)
            localStorage.setItem('admin_session', 'authenticated')
        } else {
            setLoginError(true)
        }
    }

    const handleLogout = () => {
        setIsAuthenticated(false)
        localStorage.removeItem('admin_session')
    }

    useEffect(() => {
        if (isAuthenticated) {
            fetchGuests()
        }
    }, [isAuthenticated])

    const fetchGuests = async () => {
        try {
            setLoading(true)
            const response = await fetch('/api/guests')
            const data = await response.json()
            setGuests(data.guests || [])
            setError(null)
        } catch (err) {
            setError('Error al cargar los invitados')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const deleteGuest = async (id: string, code: string) => {
        if (!confirm('¿Estás seguro de eliminar este invitado?')) return

        try {
            const response = await fetch('/api/guests', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, code }),
            })

            if (response.ok) {
                setGuests(guests.filter(g => g.id !== id))
            }
        } catch (err) {
            console.error('Error deleting guest:', err)
        }
    }

    const addGuest = async () => {
        if (!newGuest.name.trim()) return

        setSaving(true)
        try {
            const response = await fetch('/api/guests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: newGuest.name,
                    guestsAmount: newGuest.guestsAmount,
                    guests: [],
                    dietaryRestrictions: '',
                    code: newGuest.code,
                }),
            })

            if (response.ok) {
                const data = await response.json()
                setGuests([...guests, data.guest])
                setModalOpen(false)
                setNewGuest({
                    name: '',
                    guestsAmount: 1,
                    code: generateCode(),
                })
            }
        } catch (err) {
            console.error('Error adding guest:', err)
        } finally {
            setSaving(false)
        }
    }

    const openAddModal = () => {
        setNewGuest({
            name: '',
            guestsAmount: 1,
            code: generateCode(),
        })
        setModalOpen(true)
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
    }

    const stats = {
        total: guests.length,
        totalGuests: guests.length,
    }

    const getInvitationLink = (code: string) => `${baseUrl}/invitation?code=${code}`

    if (!isAuthenticated) {
        return (
            <main className="admin admin--login">
                <div className="admin__login-container">
                    <h1 className="admin__login-title">Acceso Administrador</h1>
                    <form onSubmit={handleLogin} className="admin__login-form">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                                setLoginError(false)
                            }}
                            placeholder="Contraseña"
                            className={`admin__login-input ${loginError ? 'admin__login-input--error' : ''}`}
                            autoFocus
                        />
                        {loginError && (
                            <p className="admin__login-error">Contraseña incorrecta</p>
                        )}
                        <button type="submit" className="admin__login-button">
                            Entrar
                        </button>
                    </form>
                </div>
            </main>
        )
    }

    return (
        <main className="admin">
            <div className="admin__header">
                <h1 className="admin__title">Gestión de Invitados</h1>
                <div className="admin__header-actions">
                    <button className="admin__add" onClick={openAddModal}>
                        + Agregar invitado
                    </button>
                    <button className="admin__refresh" onClick={fetchGuests}>
                        Actualizar
                    </button>
                    <button className="admin__logout" onClick={handleLogout}>
                        Salir
                    </button>
                </div>
            </div>

            <div className="admin__stats">
                <div className="admin__stat">
                    <span className="admin__stat-value">{stats.total}</span>
                    <span className="admin__stat-label">Invitaciones</span>
                </div>
                <div className="admin__stat admin__stat--guests">
                    <span className="admin__stat-value">{stats.totalGuests}</span>
                    <span className="admin__stat-label">Total personas</span>
                </div>
            </div>

            {loading ? (
                <div className="admin__loading">Cargando...</div>
            ) : error ? (
                <div className="admin__error">{error}</div>
            ) : (
                <div className="admin__table-container">
                    <table className="admin__table">
                        <thead>
                            <tr>
                                <th>Invitado</th>
                                <th>Cantidad</th>
                                <th>Acompañantes</th>
                                <th>Restricciones</th>
                                <th>Código</th>
                                <th>Link</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {guests.map(guest => (
                                <tr key={guest.id} className="admin__row">
                                    <td>{guest.name}</td>
                                    <td>{guest.guestsAmount}</td>
                                    <td>{guest.guests.length > 0 ? guest.guests.join(', ') : '-'}</td>
                                    <td>{guest.dietaryRestrictions || '-'}</td>
                                    <td>
                                        <div className="admin__code-cell">
                                            <code>{guest.code || '-'}</code>
                                            {guest.code && (
                                                <button
                                                    className="admin__copy"
                                                    onClick={() => copyToClipboard(guest.code)}
                                                    title="Copiar código"
                                                >
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        {guest.code ? (
                                            <div className="admin__link-cell">
                                                <button
                                                    className="admin__copy-link"
                                                    onClick={() => copyToClipboard(getInvitationLink(guest.code))}
                                                    title="Copiar link"
                                                >
                                                    Copiar link de invitación
                                                </button>
                                            </div>
                                        ) : '-'}
                                    </td>
                                    <td>
                                        <button
                                            className="admin__delete"
                                            onClick={() => deleteGuest(guest.id, guest.code)}
                                            aria-label="Eliminar"
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {guests.length === 0 && (
                        <div className="admin__empty">No hay invitados</div>
                    )}
                </div>
            )}

            {/* Add Guest Modal */}
            {modalOpen && (
                <div className="admin__modal" onClick={() => setModalOpen(false)}>
                    <div className="admin__modal-content" onClick={e => e.stopPropagation()}>
                        <button
                            className="admin__modal-close"
                            onClick={() => setModalOpen(false)}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>

                        <h2 className="admin__modal-title">Agregar Invitado</h2>

                        <div className="admin__modal-form">
                            <div className="admin__modal-field">
                                <label>Invitado</label>
                                <input
                                    type="text"
                                    value={newGuest.name}
                                    onChange={e => setNewGuest({ ...newGuest, name: e.target.value })}
                                    placeholder="Nombre del invitado"
                                    autoFocus
                                />
                            </div>

                            <div className="admin__modal-field">
                                <label>Cantidad de invitados</label>
                                <select
                                    value={newGuest.guestsAmount}
                                    onChange={e => setNewGuest({ ...newGuest, guestsAmount: parseInt(e.target.value) })}
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                        <option key={n} value={n}>{n}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="admin__modal-field">
                                <label>Código</label>
                                <input
                                    type="text"
                                    value={newGuest.code}
                                    disabled
                                    className="admin__modal-input--disabled"
                                />
                            </div>

                            <div className="admin__modal-field">
                                <label>Link</label>
                                <input
                                    type="text"
                                    value={getInvitationLink(newGuest.code)}
                                    disabled
                                    className="admin__modal-input--disabled"
                                />
                            </div>

                            <button
                                className="admin__modal-submit"
                                onClick={addGuest}
                                disabled={saving || !newGuest.name.trim()}
                            >
                                {saving ? 'Guardando...' : 'Agregar'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}
